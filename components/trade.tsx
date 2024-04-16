"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
  BaseError,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"
import { Address } from "viem"
import { shortHelperABI } from "../abi/shortHelper"

export function Trade() {
  const { isConnected } = useAccount()
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const vaultId = 0 as unknown as bigint
  const uniNftId = 0 as unknown as bigint
  const shortHelperAddress =
    "0x0000000000000000000000000000000000000000" as Address

  const exactInputParams = {
    tokenIn: "0x0000000000000000000000000000000000000000" as Address, // Address of wPowerPerp
    tokenOut: "0x0000000000000000000000000000000000000000" as Address, // Address of WETH
    fee: 3000 as number, // Fee (in ppm)
    recipient: "0x0000000000000000000000000000000000000000" as Address, // Address of recipient (this contract address)
    deadline: 1714435200 as unknown as bigint, // Deadline timestamp
    amountIn: 1000 as unknown as bigint, // Amount of wPowerPerp to sell
    amountOutMinimum: 0 as unknown as bigint, // Minimum amount of WETH to receive
    sqrtPriceLimitX96: 0 as unknown as bigint, // sqrtPriceLimitX96
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const amount: string = formData.get("amount") as string
    writeContract({
      address: shortHelperAddress,
      abi: shortHelperABI,
      functionName: "openShort",
      args: [
        BigInt(vaultId),
        BigInt(amount),
        BigInt(uniNftId),
        exactInputParams,
      ],
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Trade</CardTitle>
          <CardDescription>Enter amount to execute</CardDescription>
        </CardHeader>
        {isConnected ? (
          <form onSubmit={onSubmit}>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="subject">Amount</Label>
                <Input
                  name="amount"
                  placeholder="1000"
                  type="number"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between space-x-2 pt-4">
              <Button variant="ghost">Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Executing..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardFooter className="justify-center space-x-2 pt-4">
            <ConnectButton />
          </CardFooter>
        )}
        {error && (
          <CardContent>
            <p className="text-sm font-medium leading-none">Error</p>
            <p className="truncate text-wrap text-sm text-muted-foreground hover:text-clip">
              Error: {(error as BaseError).shortMessage || error.message}
            </p>
          </CardContent>
        )}
        {hash && (
          <CardContent>
            <p className="text-sm font-medium leading-none">Executing</p>
            <p className="text-sm text-muted-foreground">
              Transaction Hash: {hash}
            </p>
          </CardContent>
        )}
        {isConfirming && (
          <CardContent>
            <p className="text-sm font-medium leading-none">Executing</p>
            <p className="text-sm text-muted-foreground">
              Waiting for confirmation...
            </p>
          </CardContent>
        )}
        {isConfirmed && (
          <CardContent>
            <p className="text-sm font-medium leading-none">Success</p>
            <p className="text-sm text-muted-foreground">
              Transaction confirmed.
            </p>
          </CardContent>
        )}
      </Card>
    </>
  )
}
