"use client"

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  PencilIcon,
  PlusIcon,
  SaveIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react"
import { useClient } from "sanity"

type Group = { _id: string; name: string; order?: number; parentId?: string }
type Item = { _id: string; name: string; groupId: string; url: string }

const apiVersion = "2026-08-03"
const rootId = "stockImageGroup-root"
function unsortedId(tabId: string) {
  return `stockImageGroup-unsorted-${tabId.replace("stockImageGroup-", "")}`
}

function InlineGroupName({
  group,
  editing,
  centered = false,
  value,
  onChange,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: {
  group: Group
  editing: boolean
  centered?: boolean
  value: string
  onChange: (value: string) => void
  onEdit: () => void
  onSave: () => void
  onCancel: () => void
  onDelete?: () => void
}) {
  if (editing) {
    return (
      <span className="relative inline-flex min-w-0 items-center">
        <input
          autoFocus
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onSave}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSave()
            if (event.key === "Escape") onCancel()
          }}
          className={`min-w-0 rounded-md border py-1 pr-8 pl-2 text-inherit outline-none focus:ring-2 focus:ring-black/20 ${centered ? "w-28 text-center" : "text-left"}`}
          aria-label={`Rename ${group.name}`}
        />
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={onSave}
          className="absolute right-1 rounded p-1 text-neutral-400 hover:bg-black/5 hover:text-black"
          aria-label={`Save ${group.name}`}
        >
          <SaveIcon className="h-3.5 w-3.5" />
        </button>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center justify-center gap-1">
      <span>{group.name}</span>
      <button
        type="button"
        onClick={onEdit}
        className="rounded p-1 text-neutral-400 hover:bg-black/5 hover:text-black"
        aria-label={`Rename ${group.name}`}
      >
        <PencilIcon className="h-3.5 w-3.5" />
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="rounded p-1 text-neutral-400 hover:bg-red-50 hover:text-red-600"
          aria-label={`Delete ${group.name}`}
        >
          <Trash2Icon className="h-3.5 w-3.5" />
        </button>
      )}
    </span>
  )
}

export function StockImageManager() {
  const client = useClient({ apiVersion })
  const fileInput = useRef<HTMLInputElement>(null)
  const [groups, setGroups] = useState<Group[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [activeTabId, setActiveTabId] = useState("")
  const [activeFilterId, setActiveFilterId] = useState("all")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [editingId, setEditingId] = useState("")
  const [editingName, setEditingName] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  const load = useCallback(async () => {
    const result = await client.fetch<{ groups: Group[]; items: Item[] }>(`{
      "groups": *[_type == "stockImageGroup"] | order(order asc, name asc){_id,name,order,"parentId":parent._ref},
      "items": *[_type == "stockImage"] | order(name asc){_id,name,"groupId":group._ref,"url":image.asset->url}
    }`)
    setGroups(result.groups)
    setItems(result.items)
    const firstTab = result.groups.find((group) => group.parentId === rootId)
    setActiveTabId((current) => current || firstTab?._id || "")
  }, [client])

  useEffect(() => {
    const timeout = window.setTimeout(
      () => void load().catch((reason) => setError(String(reason))),
      0
    )
    return () => window.clearTimeout(timeout)
  }, [load])

  const tabs = groups.filter((group) => group.parentId === rootId)
  const filters = groups.filter((group) => group.parentId === activeTabId)
  const filterIds = useMemo(
    () => new Set(filters.map((group) => group._id)),
    [filters]
  )
  const tabItems = items.filter((item) => filterIds.has(item.groupId))
  const visibleFilters =
    activeFilterId === "all"
      ? filters
      : filters.filter((filter) => filter._id === activeFilterId)
  const groupById = useMemo(
    () => new Map(groups.map((group) => [group._id, group])),
    [groups]
  )

  function chooseTab(id: string) {
    setActiveTabId(id)
    setActiveFilterId("all")
    setSelected(new Set())
  }

  async function createTab() {
    const name = window.prompt("High-level group name")?.trim()
    if (!name) return
    const created = await client.create({
      _type: "stockImageGroup",
      name,
      parent: { _type: "reference", _ref: rootId },
      order: tabs.length + 1,
    })
    await load()
    chooseTab(created._id)
  }

  async function createFilter() {
    if (!activeTabId) return
    const name = window.prompt("Subgroup name")?.trim()
    if (!name) return
    const created = await client.create({
      _type: "stockImageGroup",
      name,
      parent: { _type: "reference", _ref: activeTabId },
      order: filters.length + 1,
    })
    await load()
    setActiveFilterId(created._id)
  }

  function startRename(id: string) {
    const group = groupById.get(id)
    if (!group) return
    setEditingId(id)
    setEditingName(group.name)
  }

  async function saveRename() {
    const name = editingName.trim()
    const id = editingId
    if (!id) return
    setEditingId("")
    if (!name || name === groupById.get(id)?.name) return
    await client.patch(id).set({ name }).commit()
    await load()
  }

  async function moveItems(targetId: string, ids: string[]) {
    if (!ids.length) return
    let transaction = client.transaction()
    ids.forEach((id) => {
      transaction = transaction.patch(id, {
        set: { group: { _type: "reference", _ref: targetId } },
      })
    })
    await transaction.commit()
    setSelected(new Set())
    await load()
  }

  async function deleteFilter(filter: Group) {
    const imageCount = items.filter(
      (item) => item.groupId === filter._id
    ).length
    if (imageCount > 0) {
      window.alert(
        `Move the ${imageCount} image${imageCount === 1 ? "" : "s"} out of ${filter.name} before deleting it.`
      )
      return
    }
    if (!window.confirm(`Delete the empty subsection “${filter.name}”?`)) return
    await client.delete(filter._id)
    if (activeFilterId === filter._id) setActiveFilterId("all")
    await load()
  }

  async function ensureUnsorted(tabId: string) {
    const id = unsortedId(tabId)
    await client.createIfNotExists({
      _id: id,
      _type: "stockImageGroup",
      name: "Unsorted",
      parent: { _type: "reference", _ref: tabId },
      order: 999,
      systemKey: `unsorted/${tabId}`,
    })
    return id
  }

  async function dropOnTab(event: React.DragEvent, tabId: string) {
    event.preventDefault()
    const payload = event.dataTransfer.getData("text/plain")
    if (payload.startsWith("group:")) {
      await client
        .patch(payload.slice(6))
        .set({ parent: { _type: "reference", _ref: tabId } })
        .commit()
      await load()
      chooseTab(tabId)
      return
    }
    if (payload.startsWith("image:")) {
      const target = await ensureUnsorted(tabId)
      await moveItems(target, [payload.slice(6)])
      chooseTab(tabId)
    }
  }

  async function upload(files: FileList | null) {
    if (!files?.length || !activeTabId) return
    setBusy(true)
    setError("")
    try {
      const targetId =
        activeFilterId === "all"
          ? await ensureUnsorted(activeTabId)
          : activeFilterId
      for (const file of Array.from(files)) {
        const asset = await client.assets.upload("image", file, {
          filename: file.name,
        })
        await client.create({
          _type: "stockImage",
          name: file.name.replace(/\.[^.]+$/, ""),
          sourceFilename: file.name,
          image: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          },
          group: { _type: "reference", _ref: targetId },
        })
      }
      await load()
      setActiveFilterId(targetId)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason))
    } finally {
      setBusy(false)
      if (fileInput.current) fileInput.current.value = ""
    }
  }

  return (
    <div className="min-h-[calc(100vh-60px)] bg-white text-neutral-950">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur">
        <div className="flex items-center justify-center px-3 py-2 sm:px-5">
          <div
            className="flex max-w-full min-w-0 justify-center overflow-x-auto"
            role="tablist"
          >
            {tabs.map((tab) => {
              const active = activeTabId === tab._id
              return (
                <div
                  key={tab._id}
                  role="tab"
                  aria-selected={active}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => void dropOnTab(event, tab._id)}
                  className={`flex w-44 shrink-0 items-center justify-center px-2 py-3 text-center text-sm font-normal ${active ? "text-black" : "text-neutral-500 hover:text-black"}`}
                >
                  {active ? (
                    <InlineGroupName
                      group={tab}
                      editing={editingId === tab._id}
                      centered
                      value={editingName}
                      onChange={setEditingName}
                      onEdit={() => startRename(tab._id)}
                      onSave={() => void saveRename()}
                      onCancel={() => setEditingId("")}
                    />
                  ) : (
                    <button
                      type="button"
                      className="w-full"
                      onClick={() => chooseTab(tab._id)}
                    >
                      {tab.name}
                    </button>
                  )}
                </div>
              )
            })}
            <button
              className="ml-1 shrink-0 rounded-md p-2 hover:bg-black/5"
              onClick={() => void createTab()}
              aria-label="Add high-level group"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1 px-3 py-2 sm:px-5">
          {filters.map((filter) => (
            <button
              key={filter._id}
              type="button"
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData("text/plain", `group:${filter._id}`)
              }
              onClick={() =>
                setActiveFilterId((current) =>
                  current === filter._id ? "all" : filter._id
                )
              }
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                const payload = event.dataTransfer.getData("text/plain")
                if (payload.startsWith("image:"))
                  void moveItems(filter._id, [payload.slice(6)])
              }}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${activeFilterId === filter._id ? "bg-black text-white" : "bg-neutral-100 hover:bg-neutral-200"}`}
            >
              {filter.name}
              <span className="ml-1.5 opacity-60">
                {items.filter((item) => item.groupId === filter._id).length}
              </span>
            </button>
          ))}
          <button
            className="ml-1 rounded-md p-2 hover:bg-black/5"
            onClick={() => void createFilter()}
            aria-label="Add subgroup"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="p-3 sm:p-5">
        <button
          type="button"
          disabled={busy}
          onClick={() => fileInput.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            void upload(event.dataTransfer.files)
          }}
          className="mb-5 flex min-h-36 w-full flex-col items-center justify-center rounded-md border border-dashed border-black/20 text-sm text-neutral-500 hover:border-black/40 hover:bg-black/[0.02] hover:text-black disabled:opacity-50"
        >
          <UploadIcon className="mb-1 h-4 w-4" />
          <span>
            {busy ? "Uploading…" : "Drop images here or click to upload"}
          </span>
        </button>
        <input
          ref={fileInput}
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={(event) => void upload(event.target.files)}
        />
        {error && (
          <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="space-y-8">
          {visibleFilters.map((filter) => {
            const sectionItems = tabItems.filter(
              (item) => item.groupId === filter._id
            )
            return (
              <section
                key={filter._id}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  const payload = event.dataTransfer.getData("text/plain")
                  if (payload.startsWith("image:"))
                    void moveItems(filter._id, [payload.slice(6)])
                }}
              >
                <div className="mb-3 border-b pb-2">
                  <div
                    draggable={editingId !== filter._id}
                    onDragStart={(event) =>
                      event.dataTransfer.setData(
                        "text/plain",
                        `group:${filter._id}`
                      )
                    }
                    className="flex w-fit cursor-grab items-center gap-2 active:cursor-grabbing"
                  >
                    <h2 className="text-sm font-medium">
                      <InlineGroupName
                        group={filter}
                        editing={editingId === filter._id}
                        value={editingName}
                        onChange={setEditingName}
                        onEdit={() => startRename(filter._id)}
                        onSave={() => void saveRename()}
                        onCancel={() => setEditingId("")}
                        onDelete={() => void deleteFilter(filter)}
                      />
                    </h2>
                    <span className="text-xs text-neutral-400">
                      {sectionItems.length}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {sectionItems.map((item) => (
                    <button
                      key={item._id}
                      type="button"
                      draggable
                      onDragStart={(event) =>
                        event.dataTransfer.setData(
                          "text/plain",
                          `image:${item._id}`
                        )
                      }
                      onClick={() =>
                        setSelected((current) => {
                          const next = new Set(current)
                          if (next.has(item._id)) next.delete(item._id)
                          else next.add(item._id)
                          return next
                        })
                      }
                      className={`overflow-hidden rounded-md border text-left ${selected.has(item._id) ? "ring-2 ring-black ring-offset-2" : ""}`}
                    >
                      <img
                        src={`${item.url}?w=500&h=360&fit=crop&auto=format`}
                        alt=""
                        className="aspect-[4/3] w-full bg-neutral-100 object-cover"
                      />
                      <span className="block truncate p-2 text-xs">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>
    </div>
  )
}
