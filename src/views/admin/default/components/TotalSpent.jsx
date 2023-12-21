import React, {useEffect, useState} from "react";
import {
    MdArrowDropUp,
    MdOutlineCalendarToday,
    MdBarChart, MdArrowDropDown,
} from "react-icons/md";
import Card from "components/card";
import {
    lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import ManageService from "../../../../service/ManageService";
import {toast} from "react-toastify";

const TotalSpent = () => {
    const [totalInputThisMonth, setTotalInputThisMonth] = useState({});
    const [totalOutputThisMonth, setTotalOutputThisMonth] = useState({});
    const [expenseInUser, setExpenseInUser] = useState({});
    const [allInput, setAllInput] = useState([]);
    const [allOutput, setAllOutput] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [percentageChange, setPercentageChange] = useState(null);
    const [changeText, setChangeText] = useState("");
    const [isLimit, setIsLimit] = useState(false);
    const [isCheck, setIsCheck] = useState(true);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        returnAllInput()
        returnAllOutput()
        returnTotalInputMonth()
        returnTotalOutputMonth()
        returnExpenseInUser()
        dataRevenueNew()
        setLoad(false)
    }, [load, localStorage.getItem("load")]);

    useEffect(() => {
        calculatePercentageChange(totalInputThisMonth.totalInput, totalOutputThisMonth.totalOutput);
    }, [expenseInUser,localStorage.getItem("limit"),localStorage.getItem("load")]);

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
        const limit = parseFloat(localStorage.getItem("limit")) || 0;
        if (limit !== 0) {
            const changePercentage = ((totalOutput - limit) / limit) * 100;
            if(changePercentage.toFixed(2) >= 0 ){
                setChangeText("-"+changePercentage.toFixed(2) + '%');
                setPercentageChange(changePercentage.toFixed(2));
            }else {
                let Percentage = changePercentage.toFixed(2);
                let stringWithoutFirstCharacter = Percentage.substring(1);
                setChangeText("+"+stringWithoutFirstCharacter + '%');
                setPercentageChange(changePercentage.toFixed(2));
            }

        } else {
            setChangeText("");
            if (totalInput !== 0) {
                const changePercentage = (totalOutput / totalInput) * 100;
                setChangeText('+' + changePercentage.toFixed(2) + '%');
                setPercentageChange(changePercentage.toFixed(2));
            } else {
                setPercentageChange(null);
            }
        }
    };

    const saveInLimit = () => {
      if(document.getElementById("input-value").value != ""){
          toast.success("Đặt hạn mức chi tiêu thành công")
          localStorage.setItem("limit",document.getElementById("input-value").value)
          setLoad(true)
      }else {
          toast.error("Bạn chưa nhập hạn mức chi tiêu !")
      }
    }
    const tapInLimit = () => {
      if(isLimit == true){
          setIsLimit(false)
          setIsCheck(true)
      }else {
          setIsLimit(true)
          setIsCheck(false)
      }
    }
    useEffect(() => {
        ManageService.GetYearlyRevenues().then((response) => {
            var Revenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var data = response.data;
            for (let i = 0; i < Revenue.length + 1; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (data[j].month.substring(5, 7) == (i + 1).toString()) {
                        Revenue[i] = data[j].revenue;
                    }
                }
            }
            let LineChartInput = Array.from({ length: 12 }, () => 0);
            for (let i = 0; i < allInput.length; i++) {
                const monthIndex = parseInt(allInput[i].createAt.substring(5, 7)) - 1;
                LineChartInput[monthIndex] += allInput[i].money;
            }
            let LineChartOutput = Array.from({ length: 12 }, () => 0);
            for (let i = 0; i < allOutput.length; i++) {
                const monthIndex = parseInt(allOutput[i].createAt.substring(5, 7)) - 1;
                LineChartOutput[monthIndex] += allOutput[i].money;
            }

            const lineChartData123 = [
                {
                    name: "Revenue",
                    data: Revenue,
                    color: "#4318FF",
                },
                {
                    name: "Income",
                    data: LineChartInput,
                    color: "#6AD2FF",
                },
                {
                    name: "Spending",
                    data: LineChartOutput,
                    color: "#bd1414",
                },
            ];
            setLineChartData(lineChartData123)
        })
    }, [load, localStorage.getItem("userToken"), expenseInUser,localStorage.getItem("load")]);
    const returnAllInput = () => {
        ManageService.GetAllInput().then((response) => {
            const sortedInput = response.data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
            setAllInput(sortedInput);
        })
    }
    const returnAllOutput = () => {
        ManageService.GetAllOutPut().then((response) => {
            const sortedOutput = response.data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
            setAllOutput(sortedOutput);
        })
    }
    const dataRevenueNew = () => {
        const lineChartData123 = [
            {
                name: "Revenue",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                color: "#4318FF",
            },
            {
                name: "Income",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                color: "#6AD2FF",
            },
            {
                name: "Spending",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                color: "#6AD2FF",
            },
        ];
        setLineChartData(lineChartData123)
        console.log("34536")
        console.log(lineChartData123)
    }
    return (
        <div>
            <Card extra="!p-[20px] text-center">
                <div className="flex justify-between">
                    <button
                        className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
                        <MdOutlineCalendarToday/>
                        <span className="text-sm font-medium text-gray-600">Các tháng</span>
                    </button>
                    <button
                        className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                        <MdBarChart className="h-6 w-6"/>
                    </button>
                </div>

                <div
                    className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
                    <div className="flex flex-col">
                        <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
                            {(Math.round((expenseInUser.totalAmount))) / 1000 + 'K'}
                        </p>
                        <div className="flex flex-col items-start">
                            <p className="mt-2 text-sm text-gray-600">Chi tiêu</p>
                            <div className="flex flex-row items-center justify-center">
                                {percentageChange < 0 ?
                                    <>
                                        <MdArrowDropUp className="font-medium text-green-500"/>
                                        <p className="text-sm font-bold text-green-500">
                                            {changeText}
                                        </p>
                                    </>
                                    : percentageChange > 0 ?
                                        <>
                                            <MdArrowDropDown className="font-medium text-red-500"/>
                                            <p className="text-sm font-bold text-red-500">
                                                {changeText}
                                            </p>
                                        </> : <>
                                            <MdArrowDropUp className="font-medium text-green-500"/>
                                            <p className="text-sm font-bold text-green-500">
                                                +0%
                                            </p>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="h-full w-full">
                        {localStorage.getItem("userToken") != null ? <LineChart
                            options={lineChartOptionsTotalSpent}
                            series={lineChartData}/> : <></>}
                    </div>
                </div>
            </Card>
            <div style={{display : "flex"}}>
                <button id={"Button-Spending-Limit"} onClick={()=> tapInLimit()}>Đặt hạn mức chi tiêu</button>
                {isLimit ? <div id={"input-Spending-Limit"}>
                    <input id={"input-value"} type="number" placeholder={"Hạn mức chi tiêu"}/>
                    <button id={"button-input-Spending-Limit"} onClick={()=>saveInLimit()}>Lưu</button>
                </div> : <></>}
                {isCheck ? <div><h1 style={{marginLeft : "20px", marginTop :"20px"}}>Hạn mức chi tiêu : {localStorage.getItem("limit")} VND</h1></div> : <></>}
            </div>
        </div>
    );
};

export default TotalSpent;
