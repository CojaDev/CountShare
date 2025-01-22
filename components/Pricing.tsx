import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 py-24 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose Your Perfect Plan
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Select the ideal plan for your countdown needs. Whether you're an
            individual or a business, we have the perfect option for you.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 gap-x-6 sm:mt-20 sm:gap-y-0 lg:max-w-5xl lg:grid-cols-3">
          {/* Free Plan */}
          <div className="relative flex flex-col rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10 transition-all duration-300 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold leading-8 text-gray-900">
              Free
            </h3>
            <p className="mt-4 text-base leading-6 text-gray-600 h-12">
              Perfect for getting started with CountShare.
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                $0
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-600">
                /month
              </span>
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-[#00c2cb]" />
                Create up to 5 countdowns
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-[#00c2cb]" />
                Basic customization options
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-[#00c2cb]" />
                Share countdowns publicly
              </li>
            </ul>
            <Button className="mt-8 w-full bg-[#00c2cb] hover:bg-[#00a7af]">
              Get started
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="relative flex flex-col rounded-3xl bg-white p-8 shadow-xl ring-1 ring-[#00c2cb] sm:p-10 transition-all duration-300 hover:shadow-2xl lg:z-10 lg:scale-105">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="inline-flex items-center rounded-full bg-[#00c2cb] px-4 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#00c2cb]/30">
                Most Popular
              </span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold leading-8 text-gray-900">
                Premium
              </h3>
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            </div>
            <p className="mt-4 text-base leading-6 text-gray-600 h-12">
              Unlock advanced features and create unlimited countdowns.
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                $9.99
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-600">
                /month
              </span>
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-[#00c2cb]" />
                Unlimited countdowns
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-[#00c2cb]" />
                Advanced customization options
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-[#00c2cb]" />
                Remove CountShare watermark
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-[#00c2cb]" />
                Priority support
              </li>
            </ul>
            <Button className="mt-8 w-full bg-[#00c2cb] hover:bg-[#00a7af]">
              Upgrade to Premium
            </Button>
          </div>

          {/* Custom Plan */}
          <div className="relative flex flex-col rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10 transition-all duration-300 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold leading-8 text-gray-900">
              Custom
            </h3>
            <p className="mt-4 text-base leading-6 text-gray-600 h-12">
              Tailored solutions for businesses and special events.
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                Custom
              </span>
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-[#00c2cb]" />
                Customized features
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-[#00c2cb]" />
                Dedicated account manager
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-[#00c2cb]" />
                API access
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-[#00c2cb]" />
                24/7 premium support
              </li>
            </ul>
            <Button className="mt-8 w-full bg-[#00c2cb] hover:bg-[#00a7af]">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
