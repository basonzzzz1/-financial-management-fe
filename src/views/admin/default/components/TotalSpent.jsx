import React, {useEffect, useState} from "react";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart, MdArrowDropDown,
} from "react-icons/md";
import Card from "components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import ManageService from "../../../../service/ManageService";

const TotalSpent = () => {
  const [totalInputThisMonth, setTotalInputThisMonth] = useState({});
  const [totalOutputThisMonth, setTotalOutputThisMonth] = useState({});
  const [expenseInUser, setExpenseInUser] = useState({});
  const [percentageChange, setPercentageChange] = useState(null);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    returnTotalInputMonth()
    returnTotalOutputMonth()
    returnExpenseInUser()
    setLoad(false)
  }, [load]);
  useEffect(() => {
    calculatePercentageChange(totalInputThisMonth.totalInput, totalOutputThisMonth.totalOutput);
  }, [expenseInUser]);

  const returnTotalInputMonth = () => {
    ManageService.TotalInputMonth().then((response) => {
      setTotalInputThisMonth(response.data)
      console.log(response)

    })
  }
  const returnTotalOutputMonth = () => {
    ManageService.TotalOutputMonth().then((response) => {
      setTotalOutputThisMonth(response.data)
      console.log(response)
    })
  }
  const returnExpenseInUser = () => {
    ManageService.ExpenseInUserLog().then((response) => {
      console.log(response)
      setExpenseInUser(response.data)
    })
  }
  const calculatePercentageChange = (totalInput, totalOutput) => {
    if (totalInput !== 0) {
      const changePercentage = ((totalInput - totalOutput) / totalInput) * 100;
      setPercentageChange(changePercentage.toFixed(2));
    } else {
      setPercentageChange(null);
    }
  };

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">This month</span>
        </button>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            {(Math.round((expenseInUser.totalAmount)))/1000+'K'}
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Total Spent</p>
            <div className="flex flex-row items-center justify-center">

              {percentageChange > 50 ?
                  <>
                    <MdArrowDropUp className="font-medium text-green-500" />
                    <p className="text-sm font-bold text-green-500">
                      {'+'+(Math.round((50 - percentageChange)*1000)/1000)+'%'}
                    </p>
                  </>
                   :
                  <>
                    <MdArrowDropDown className="font-medium text-red-500" />
                    <p className="text-sm font-bold text-red-500">
                      {'-'+(Math.round((50 - percentageChange)*1000)/1000)+'%'}
                    </p>
                  </>
              }

            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <LineChart
            options={lineChartOptionsTotalSpent}
            series={lineChartDataTotalSpent}
          />
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;
