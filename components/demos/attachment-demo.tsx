import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"

export default function AttachmentDemo() {
  return (
    <Attachment>
      <AttachmentMedia>PNG</AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>reference-frame.png</AttachmentTitle>
        <AttachmentDescription>1.8 MB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  )
}
