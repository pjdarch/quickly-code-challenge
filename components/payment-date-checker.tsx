"use client"

import { useEffect, useState } from "react";
import { addMonths, isAfter, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

export default function PaymentDateChecker() {
  const [invoiceDueDate, setInvoiceDueDate] = useState<Date | undefined>()
  const [payCycleDate, setPayCycleDate] = useState<Date | undefined>()
  const [paymentDate, setPaymentDate] = useState<Date | null>(null)

  const calculatePaymentDate = () => {
    if (!invoiceDueDate || !payCycleDate) return null

    const payCycleDay = payCycleDate.getDate()

    // Create a date with the pay cycle day in the same month as the invoice
    let nextPaymentDate = new Date(invoiceDueDate)
    nextPaymentDate.setDate(payCycleDay)

    // TODO: Determine if payments should be processed on the same day as the invoice due date
    // TODO: Ensure next pay cycle dates are valid business days, if required
    if (isAfter(invoiceDueDate, nextPaymentDate)) {
      // If the invoice due date occurs after the pay cycle date for this month,
      // the next payment will happen on the pay cycle date of the next month
      nextPaymentDate = addMonths(nextPaymentDate, 1)
    }

    setPaymentDate(nextPaymentDate)
  }

  useEffect(() => {
    calculatePaymentDate()
  }, [invoiceDueDate, payCycleDate])

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Payment Date Checker</CardTitle>
        <CardDescription>Determine when your invoice will be paid based on your monthly pay cycle</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="invoice-date">Invoice Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="invoice-date"
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !invoiceDueDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoiceDueDate ? format(invoiceDueDate, "PPP") : "Select invoice due date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={invoiceDueDate}
                onSelect={(date) => {
                  setInvoiceDueDate(date)
                  calculatePaymentDate()
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pay-cycle-date">Monthly Pay Cycle Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="pay-cycle-date"
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !payCycleDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {payCycleDate ? `Every month on the ${format(payCycleDate, "do")}` : "Select monthly payment date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={payCycleDate}
                onSelect={(date) => {
                  setPayCycleDate(date)
                  calculatePaymentDate()
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p className="text-sm text-muted-foreground">This is the day of each month when payments are to be processed</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {invoiceDueDate && payCycleDate && paymentDate ? (
          <div className="p-4 border rounded-md w-full bg-muted/50">
            <p>
              Your invoice payment date will be{" "}
              <span className="font-bold">{format(paymentDate, "MMMM d, yyyy")}</span>
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Please select both an invoice due date and a monthly payment cycle date to see the result.
          </p>
        )}
      </CardFooter>
    </Card>
  )
}

