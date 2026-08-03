import { CreditBalance } from "@/components/livepeer-ui/credit-balance"
import { creditBalance } from "@/app/mockups/_data/usage"
export default function CreditBalanceDemo() {
  return <CreditBalance {...creditBalance} />
}
