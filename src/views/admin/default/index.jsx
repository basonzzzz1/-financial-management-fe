import MiniCalendar from "components/calendar/MiniCalendar";
import TotalSpent from "views/admin/default/components/TotalSpent";
import {IoMdHome} from "react-icons/io";
import {IoDocuments} from "react-icons/io5";
import {MdBarChart, MdDashboard} from "react-icons/md";
import Widget from "components/widget/Widget"
import {useEffect, useState} from "react";
import ManageService from "../../../service/ManageService";
import "./index.css"
import {toast} from "react-toastify";

const Dashboard = () => {
    const [totalInputThisMonth, setTotalInputThisMonth] = useState({});
    const [totalOutputThisMonth, setTotalOutputThisMonth] = useState({});
    const [expenseInUser, setExpenseInUser] = useState({});
    const [categories, setCategories] = useState([]);
    const [inputType, setInputType] = useState([]);
    const [allInput, setAllInput] = useState([]);
    const [allOutput, setAllOutput] = useState([]);
    const [nameCategory, setNameCategory] = useState("");
    const [nameInputType, setNameInputType] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [load, setLoad] = useState(true);
    const [isSpending, setIsSpending] = useState(false);
    const [isIncome, setIsIncome] = useState(false);
    useEffect(() => {
        ManageService.TotalInputMonth().then((response) => {
            returnTotalInputMonth()
            returnTotalOutputMonth()
            returnExpenseInUser()
            returnCategories()
            returnInputType()
            returnAllInput()
            returnAllOutput()
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
    const returnInputType = () => {
        ManageService.GetInputType().then((response) => {
            setInputType(response.data)
        })
    }
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
    const PostOutputInUser = () => {
        if (nameCategory !== "" && document.getElementById("input-spending").value !== '') {
            let outPut = {
                title: "",
                money: document.getElementById("input-spending").value,
                expenseType: nameCategory
            }
            ManageService.PostOutPut(outPut).then((response) => {
                console.log(response)
                setNameCategory("");
                setIsSpending(false)
                setLoad(true)
                toast.success("Chi tiêu thành công !")
                localStorage.removeItem("load")
                let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                let randomIndex = Math.floor(Math.random() * arr.length);
                let randomElement = arr[randomIndex];
                localStorage.setItem("load", randomElement.toString());
            }).catch((err) => {
                toast.error("Chi tiêu không thành công !")
            })
        } else {
            toast.error("chưa nhập loại chi tiêu !")
        }

    }
    const PostInputInUser = () => {
        if (document.getElementById("input-income").value !== '') {
            let inPut = {
                title: nameInputType,
                money: document.getElementById("input-income").value,
            }
            ManageService.PostInput(inPut).then((response) => {
                console.log(response)
                setIsIncome(false)
                document.getElementById("input-income").value = "";
                setLoad(true)
                toast.success("Thu nhập thành công !")
                localStorage.removeItem("load")
                let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                let randomIndex = Math.floor(Math.random() * arr.length);
                let randomElement = arr[randomIndex];
                localStorage.setItem("load", randomElement.toString());
            }).catch((err) => {
                console.log(err)
                toast.error("Thu nhập không thành công !")
            })
        } else {
            toast.error("chưa nhập số tiền thu nhập !")
        }

    }
    const handleClickLi = (name, id) => {
        setNameCategory(name);
        if (selectedCategoryId == null) {
            setSelectedCategoryId(id);
            document.getElementById("li-categories" + id).style.backgroundColor = "#12e512";
        } else if (selectedCategoryId != id) {
            document.getElementById("li-categories" + selectedCategoryId).style.backgroundColor = "#f3f3ff";
            document.getElementById("li-categories" + id).style.backgroundColor = "#12e512";
            setSelectedCategoryId(id);
        } else if (selectedCategoryId == id) {
            document.getElementById("li-categories" + id).style.backgroundColor = "#f3f3ff";
            setSelectedCategoryId(null)
        }
    }
    const handleClickH2 = (name) => {
        if(nameInputType == ""){
            setNameInputType(name)
            document.getElementById("h2-input-type" + name).style.backgroundColor = "#12e512";
        }else if(nameInputType == name){
            setNameInputType("")
            document.getElementById("h2-input-type" + name).style.backgroundColor = "#f3f3ff";
        }else if(nameInputType != name){
            document.getElementById("h2-input-type" + nameInputType).style.backgroundColor = "#f3f3ff";
            document.getElementById("h2-input-type" + name).style.backgroundColor = "#12e512";
            setNameInputType(name)
        }

    }
    const handleIncrement = () => {
        if (isIncome === false) {
            setIsIncome(true)
            setIsSpending(false)
        } else {
            setIsIncome(false)
        }
    };

    const handleDecrement = () => {
        if (isSpending === false) {
            setIsSpending(true)
            setIsIncome(false)
        } else {
            setIsSpending(false)
        }
    };
    document.addEventListener("DOMContentLoaded", function () {
        // Lắng nghe sự kiện click trên tiêu đề danh mục chính
        document.querySelectorAll("#div-formSpending > div > h2").forEach(function (header) {
            header.addEventListener("click", function () {
                // Toggle class "expanded" để ẩn/hiện danh sách danh mục con
                this.parentElement.classList.toggle("expanded");
            });
        });
    });
    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };

        const formattedDate = new Date(dateTimeString).toLocaleString(undefined, options);
        return formattedDate;
    };
    return (
        <div>
            <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                <Widget
                    icon={<MdBarChart className="h-7 w-7"/>}
                    title={"Thu nhập tháng này"}
                    subtitle={`${totalInputThisMonth !== null ? totalInputThisMonth.totalInput+" VND" : ''}`}
                />
                <Widget
                    icon={<IoDocuments className="h-6 w-6"/>}
                    title={"Chi tiêu tháng này"}
                    subtitle={`${totalOutputThisMonth !== null ? totalOutputThisMonth.totalOutput+" VND" : ''}`}
                />
                <Widget
                    icon={<IoMdHome className="h-6 w-6"/>}
                    title={"Số tiền chi tiêu có sẵn"}
                    subtitle={`${expenseInUser !== null ? expenseInUser.totalAmount+" VND" : ''}`}
                />
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <TotalSpent/>
                <div style={{display: "flex"}}>
                    <div style={{width: "300px"}}>
                        <div className="grid grid-cols-1 rounded-[20px]">
                            <MiniCalendar/>
                        </div>
                    </div>
                    <div style={{width: "300px", height: "50px", marginTop: "10px"}}>
                        <div style={{display: "flex", marginLeft: "40px"}}>
                            <button className="action-button" onClick={handleIncrement}>
                                Thu nhập
                            </button>
                            <button className="action-button" style={{marginLeft: "30px"}} onClick={handleDecrement}>
                                Chi tiêu
                            </button>
                        </div>
                    </div>
                </div>
                {isIncome ? <div id="div-formIncome">
                    <div>
                        <input id={"input-income"} type="number" placeholder={"Thu nhập !"}/>
                        <button id={"button-income"} onClick={() => PostInputInUser()}>Thu nhập</button>
                    </div>
                    {inputType.map((i) => (
                        <div key={i}>
                            <h2 className={"h2-inputType"} id={"h2-input-type"+i} onClick={()=>handleClickH2(i)}>{i}</h2>
                        </div>
                    ))}
                </div> : <></>
                }
                {
                    isSpending ? <div id="div-formSpending">
                                <div style={{ position: 'sticky', top: '-2px' , backgroundColor : "white"}}>
                                    <input id={"input-spending"} type="number" placeholder={"Chi tiêu !"}/>
                                    <button id={"button-spending"} onClick={() => PostOutputInUser()}>Chi tiêu</button>
                                </div>
                        <div>
                            {categories.map((category) => (
                                <div key={category.id}>
                                    <h2 className={"h2-categories"}>{category.name}</h2>
                                    <ul>
                                        {category.nameCategories.map((subCategory) => (
                                            <li className={"li-categories"} id={"li-categories" + subCategory.id}
                                                key={subCategory.id} value={subCategory.name}
                                                onClick={() => handleClickLi(subCategory.name, subCategory.id)}>{subCategory.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        </div>
                        : <></>
                }

            </div>
            <div style={{display : "flex"}}>
                <div id={"table-spending"}>
                    <div>
                        <h3>Lịch sử Chi Tiêu</h3>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Loại chi tiêu</th>
                            <th>Số tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allOutput.map((ao) => (
                        <tr>
                            <td>{formatDateTime(ao.createAt)}</td>
                            <td>{ao.expenseType}</td>
                            <td>{ao.money}  VND</td>
                        </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id={"table-income"}>
                    <div>
                        <h3>Lịch sử thu nhập</h3>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Loại thu nhập</th>
                            <th>Số tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allInput.map((ai) => (
                            <tr>
                                <td>{formatDateTime(ai.createAt)}</td>
                                <td>{ai.title}</td>
                                <td>{ai.money} VND</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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
