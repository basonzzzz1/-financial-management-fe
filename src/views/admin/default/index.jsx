import MiniCalendar from "components/calendar/MiniCalendar";
import TotalSpent from "views/admin/default/components/TotalSpent";
import {IoMdHome} from "react-icons/io";
import {IoDocuments} from "react-icons/io5";
import {MdBarChart, MdDashboard} from "react-icons/md";
import Widget from "components/widget/Widget"
import {useEffect, useState} from "react";
import ManageService from "../../../service/ManageService";
import "./index.css"

const Dashboard = () => {
    const [totalInputThisMonth, setTotalInputThisMonth] = useState({});
    const [totalOutputThisMonth, setTotalOutputThisMonth] = useState({});
    const [expenseInUser, setExpenseInUser] = useState({});
    const [categories, setCategories] = useState([]);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        ManageService.TotalInputMonth().then((response) => {
            returnTotalInputMonth()
            returnTotalOutputMonth()
            returnExpenseInUser()
            returnCategories()
            setLoad(false)
        }).catch((error) => {
            setLoad(false)
        })
    }, [load]);
    const returnTotalInputMonth = () => {
        ManageService.TotalInputMonth().then((response) => {
            setTotalInputThisMonth(response.data)
        })
    }
    const returnTotalOutputMonth = () => {
        ManageService.TotalOutputMonth().then((response) => {
            setTotalOutputThisMonth(response.data)
        })
    }
    const returnExpenseInUser = () => {
        ManageService.ExpenseInUserLog().then((response) => {
            setExpenseInUser(response.data)
        })
    }
    const returnCategories = () => {
        ManageService.GetAllCategories().then((response) => {
            setCategories(response.data)
        })
    }
    const handleIncrement = () => {
        // Implement the logic to increment the value
        // Example: setTotalInputThisMonth(prevValue => prevValue + 1);
    };
    const handleDecrement = () => {
        // Implement the logic to decrement the value
        // Example: setTotalInputThisMonth(prevValue => prevValue - 1);
    };
    return (
        <div>
            {/* Card widget */}

            <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                <Widget
                    icon={<MdBarChart className="h-7 w-7"/>}
                    title={"Earnings this month"}
                    subtitle={`$${totalInputThisMonth !== null ? totalInputThisMonth.totalInput : ''}`}
                />
                <Widget
                    icon={<IoDocuments className="h-6 w-6"/>}
                    title={"Spend this month"}
                    subtitle={`$${totalOutputThisMonth !== null ? totalOutputThisMonth.totalOutput : ''}`}
                />
                <Widget
                    icon={<IoMdHome className="h-6 w-6"/>}
                    title={"Available spending amount"}
                    subtitle={`$${expenseInUser !== null ? expenseInUser.totalAmount : ''}`}
                />
            </div>

            {/* Charts */}

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <TotalSpent/>
                <div style={{display: "flex"}}>
                    <div style={{width: "300px"}}>
                        <div className="grid grid-cols-1 rounded-[20px]">
                            <MiniCalendar/>
                        </div>
                    </div>
                    <div style={{width: "300px", height: "50px"}}>
                        <div style={{display: "flex", marginLeft: "40px"}}>
                            <button className="action-button" onClick={handleIncrement}>
                                Income
                            </button>
                            <button className="action-button" style={{marginLeft: "30px"}} onClick={handleDecrement}>
                                Spending
                            </button>
                        </div>
                    </div>
                </div>
                <div id="div-formSpending">
                    {categories.map((category) => (
                        <div key={category.id}>
                            <h2 style={{marginLeft : "10px"}}>{category.name}</h2>
                            <ul>
                                {category.nameCategories.map((subCategory) => (
                                    <li style={{marginLeft : "40px"}} key={subCategory.id}>{subCategory.name}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
