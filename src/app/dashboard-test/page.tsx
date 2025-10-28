"use client";

import Link from "next/link";

export default function DashboardTestPage() {
  // Mock data for testing
  const mockMetrics = {
    totalAccountsPlaced: 15420,
    totalAccountsPlacedPreLegal: 8250,
    totalAccountsPlacedLegal: 7170,
    totalAmountPlaced: 45000000,
    totalAmountPlacedPreLegal: 22500000,
    totalAmountPlacedLegal: 22500000,
    totalRecovery: 12750000,
    liquidationRate: 28.33,
    rpcPercentage: 65.4,
    accountsWithRPC: 4520,
    accountsContacted: 6915,
    costPerDollar: 0.15,
    suitFiledRate: 42.8,
    accountsWithSuitFiled: 3068,
    servicerSuccessRate: 87.2,
    serviceAttemptsSuccessful: 2675,
    serviceAttempts: 3068,
    judgmentRate: 78.5,
    accountsWithJudgmentEntered: 2100,
    garnishmentSuccessRate: 65.7,
    judgmentExecutedViaGarnishmentOrLien: 1380,
    judgmentsEntered: 2100,
  };

  // Utility functions
  const toCurrencyWithDollarSign = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const toPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumberWithCommas = (value: number): string => {
    return value.toLocaleString();
  };

  const formatValue = (
    value: number,
    type: "number" | "currency" | "percentage"
  ): string => {
    switch (type) {
      case "currency":
        return toCurrencyWithDollarSign(value);
      case "percentage":
        return toPercentage(value);
      case "number":
        return formatNumberWithCommas(value);
      default:
        return value.toString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Legal Measures Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive legal performance metrics and analytics
          </p>
        </div>

        {/* Total Accounts Placed Section */}
        <div className="mb-8">
          <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
            <span className="mr-3 h-6 w-1 rounded-full bg-blue-600"></span>
            Total Accounts Placed
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Total Accounts */}
            <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-blue-900">
                  Total
                </h3>
                <svg
                  className="h-8 w-8 flex-shrink-0 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-3xl font-bold text-blue-900">
                {formatValue(mockMetrics.totalAccountsPlaced, "number")}
              </p>
              <p className="text-xs leading-relaxed text-blue-700">Accounts</p>
            </div>

            {/* Pre-Legal Accounts */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-gray-700">
                  Pre-Legal
                </h3>
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="mb-2 text-3xl font-bold leading-tight text-gray-900">
                {formatValue(mockMetrics.totalAccountsPlacedPreLegal, "number")}
              </p>
              <p className="text-xs leading-relaxed text-gray-600">
                Pre-Legal Accounts
              </p>
            </div>

            {/* Legal Accounts */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-gray-700">
                  Legal
                </h3>
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                  <svg
                    className="h-5 w-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
              </div>
              <p className="mb-2 text-3xl font-bold leading-tight text-gray-900">
                {formatValue(mockMetrics.totalAccountsPlacedLegal, "number")}
              </p>
              <p className="text-xs leading-relaxed text-gray-600">
                Legal Accounts
              </p>
            </div>
          </div>
        </div>

        {/* Total $ Amount Placed Section */}
        <div className="mb-8">
          <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
            <span className="mr-3 h-6 w-1 rounded-full bg-green-600"></span>
            Total $ Amount Placed
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Total Amount */}
            <div className="rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-green-900">
                  Total
                </h3>
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-3xl font-bold leading-tight text-green-900">
                {formatValue(mockMetrics.totalAmountPlaced, "currency")}
              </p>
              <p className="text-xs leading-relaxed text-green-700">
                Total Placed
              </p>
            </div>

            {/* Pre-Legal Amount */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-gray-700">
                  Pre-Legal
                </h3>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-sm font-bold text-blue-600">$</span>
                </div>
              </div>
              <p className="mb-2 text-3xl font-bold leading-tight text-gray-900">
                {formatValue(mockMetrics.totalAmountPlacedPreLegal, "currency")}
              </p>
              <p className="text-xs leading-relaxed text-gray-600">
                Pre-Legal Amount
              </p>
            </div>

            {/* Legal Amount */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-gray-700">
                  Legal
                </h3>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-sm font-bold text-purple-600">$</span>
                </div>
              </div>
              <p className="mb-2 text-3xl font-bold leading-tight text-gray-900">
                {formatValue(mockMetrics.totalAmountPlacedLegal, "currency")}
              </p>
              <p className="text-xs leading-relaxed text-gray-600">
                Legal Amount
              </p>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="mb-8">
          <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
            <span className="mr-3 h-6 w-1 rounded-full bg-purple-600"></span>
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Total Recovery */}
            <div className="rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-emerald-900">
                  Total Recovery
                </h3>
                <svg
                  className="h-6 w-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <p className="mb-2 text-2xl font-bold leading-tight text-emerald-900">
                {formatValue(mockMetrics.totalRecovery, "currency")}
              </p>
              <p className="text-xs leading-relaxed text-emerald-700">
                Recovered Amount
              </p>
            </div>

            {/* Liquidation Rate */}
            <div className="rounded-lg border border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-indigo-900">
                  Liquidation Rate
                </h3>
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-2xl font-bold leading-tight text-indigo-900">
                {formatValue(mockMetrics.liquidationRate, "percentage")}
              </p>
              <p className="text-xs leading-relaxed text-indigo-700">
                Recovery vs Placed
              </p>
            </div>

            {/* RPC % */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-gray-700">
                  RPC %
                </h3>
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-2xl font-bold leading-tight text-gray-900">
                {formatValue(mockMetrics.rpcPercentage, "percentage")}
              </p>
              <p className="text-xs leading-relaxed text-gray-600">
                {mockMetrics.accountsWithRPC.toLocaleString()} /{" "}
                {mockMetrics.accountsContacted.toLocaleString()}
              </p>
            </div>

            {/* Cost Per Dollar */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-gray-700">
                  Cost Per Dollar
                </h3>
                <svg
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-2xl font-bold leading-tight text-gray-900">
                {formatValue(mockMetrics.costPerDollar, "currency")}
              </p>
              <p className="text-xs leading-relaxed text-gray-600">
                Legal Cost / $ Collected
              </p>
            </div>
          </div>
        </div>

        {/* Legal Process Metrics */}
        <div className="mb-8">
          <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-800">
            <span className="mr-3 h-6 w-1 rounded-full bg-amber-600"></span>
            Legal Process Metrics
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Suit Filed Rate */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-gray-700">
                  Suit Filed Rate
                </h3>
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-2xl font-bold leading-tight text-gray-900">
                {formatValue(mockMetrics.suitFiledRate, "percentage")}
              </p>
              <p className="text-xs leading-relaxed text-gray-600">
                {mockMetrics.accountsWithSuitFiled.toLocaleString()} Accounts
                Filed
              </p>
            </div>

            {/* Servicer Success Rate */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-gray-700">
                  Servicer Success Rate
                </h3>
                <svg
                  className="h-6 w-6 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-2xl font-bold leading-tight text-gray-900">
                {formatValue(mockMetrics.servicerSuccessRate, "percentage")}
              </p>
              <p className="text-xs leading-relaxed text-gray-600">
                {mockMetrics.serviceAttemptsSuccessful.toLocaleString()} /{" "}
                {mockMetrics.serviceAttempts.toLocaleString()}
              </p>
            </div>

            {/* Judgment Rate */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-gray-700">
                  Judgment Rate
                </h3>
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <p className="mb-2 text-2xl font-bold leading-tight text-gray-900">
                {formatValue(mockMetrics.judgmentRate, "percentage")}
              </p>
              <p className="text-xs leading-relaxed text-gray-600">
                {mockMetrics.accountsWithJudgmentEntered.toLocaleString()}{" "}
                Judgments
              </p>
            </div>

            {/* Garnishment/Lien Success Rate */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-medium uppercase leading-tight tracking-wide text-gray-700">
                  Garnishment / Lien Success
                </h3>
                <svg
                  className="h-6 w-6 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="mb-2 text-2xl font-bold leading-tight text-gray-900">
                {formatValue(mockMetrics.garnishmentSuccessRate, "percentage")}
              </p>
              <p className="text-xs leading-relaxed text-gray-600">
                {mockMetrics.judgmentExecutedViaGarnishmentOrLien.toLocaleString()}{" "}
                / {mockMetrics.judgmentsEntered.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation back to main site */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
