import "./App.css";
import React, { useEffect, useState } from "react";
import BaseTextField from "./BaseTextField";
import BaseDropdown from "./BaseDropdown";
import BaseButton from "./BaseButton";
import BaseLoader from "./BaseLoader";
function App() {
  const [annualEarnings, setAnnualEarnings] = useState(0);
  const [compensation, setCompensation] = useState(0);
  const [compensationGrowth, setCompensationGrowth] = useState(0);
  const [years, setYears] = useState(0);
  const [risk, setRisk] = useState(1);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }, [error]);
  const calculateResults = async () => {
    if (years > 10) {
      setError("Years must be less than or equal to 10");
      return;
    }
    if (compensationGrowth < 0 || compensationGrowth > 100) {
      setError("Compensation growth must be between 0 and 100");
      return;
    }
    setLoading(true);
    const body = {
      username: "guest",
      password: "water",
      earnings: annualEarnings,
      compensation: compensation,
      earningsGrowth: compensationGrowth / 100,
      years: years,
      risk: risk,
    };
    try {
      const response = await fetch("/rest/bus04", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          charset: "UTF-8",
          accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const {
          adjustment,
          businessValue,
          calculatedDiscount,
          chartUrl,
          futureEarnings,
          responseText,
          todayEarnings,
        } = await response.json();

        setResults([
          adjustment,
          businessValue,
          calculatedDiscount,
          chartUrl,
          futureEarnings,
          responseText,
          todayEarnings,
        ]);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } else {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);

      if (error.message.startsWith("HTTP error")) {
        setError(`There was a problem with the server: ${error.message}`);
      } else {
        setError(
          "There was a problem with the network or the request: " +
            error.message
        );
      }
      setLoading(false);
    }
  };
  const reset = () => {
    setResults(null);
    setCompensation(0);
    setAnnualEarnings(0);
    setYears(0);
    setCompensationGrowth(0);
  };
  if (loading) {
    return <BaseLoader />;
  } else
    return (
      <div className="max-w-[1200px] mx-auto flex flex-col h-screen justify-center items-center gap-2">
        <p className="text-2xl my-3 underline">
          Business Evaluation Calculator
        </p>
        <BaseTextField
          title="Annual earnings before interest, taxes, depreciation, and amortization ($)"
          initialValue={annualEarnings}
          onChange={setAnnualEarnings}
        />
        <BaseTextField
          title="Excess compensation paid to owners (if any) ($)"
          initialValue={compensation}
          onChange={setCompensation}
        />
        <BaseTextField
          title="Anticipated rate of earnings/compensation growth (0 if level) (0 to 100)"
          initialValue={compensationGrowth}
          onChange={setCompensationGrowth}
        />
        <BaseTextField
          title="Number of years earnings aAnalyzing...re expected to continue"
          subtitle="(maximum 10 which assumes perpetuity) (0 to 10)"
          initialValue={years}
          onChange={setYears}
        />
        <BaseDropdown
          title="Level of business/industry/financial risk"
          subtitle="
        (Typically restaurants and retail are lower risk than manufacturing and high tech)"
          initialValue={risk}
          onChange={setRisk}
        />
        <div className="flex gap-5">
          <BaseButton onClick={calculateResults} text="Calculate" />
          <BaseButton onClick={reset} text="Reset" />
        </div>
        <p className="text-xs text-red-600 font-bold">{error}</p>
        {results && (
          <div className="flex flex-col gap-2">
            <p className="text-sm flex gap-1">
              Total future earnings/excess compensation:
              <span className="font-bold">${results[4]}</span>
            </p>
            <p className="text-sm flex gap-1">
              Calculated discount rate:
              <span className="font-bold">{results[2]}</span>
            </p>
            <p className="text-sm flex gap-1">
              Present value of tsetErroroday's earnings/excess compensation:
              <span className="font-bold">${results[6]}</span>
            </p>
            <p className="text-sm flex gap-1">
              Less adjustment for small size/lack of marketability:
              <span className="font-bold">${results[0]}</span>
            </p>
            <p className="text-sm flex gap-1">
              Estimated business value:
              <span className="font-bold">${results[1]}</span>
            </p>
            <p className="text-sm flex gap-1">{results[5]}</p>
            <p className="text-sm flex gap-1 flex-col">
              Chart URL: <img src={results[3]} alt="Chart" />
            </p>
          </div>
        )}
      </div>
    );
}

export default App;
