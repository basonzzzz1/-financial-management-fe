import React, {useEffect, useState} from 'react';
import ManageService from "../../../service/ManageService";
import {toast} from "react-toastify";
import {MdDelete, MdEdit, MdSave} from "react-icons/md";
import "./income.css"
const Income = () => {
    const [allInput, setAllInput] = useState([]);
    const [allInputSave, setAllInputSave] = useState([]);
    const [inputType, setInputType] = useState([]);
    const [selectedInputType, setSelectedInputType] = useState(null);
    const [selectedInputTypeE, setSelectedInputTypeE] = useState('');
    const [searchDate, setSearchDate] = useState("");
    const [searchMoney, setSearchMoney] = useState("");
    const [editingRowId, setEditingRowId] = useState(null);
    const [editedMoney, setEditedMoney] = useState('');
    const [load, setLoad] = useState(true);
    useEffect(() => {
        returnAllInput()
        returnInputType()
        setLoad(false)
    }, [load]);
    const returnAllInput = () => {
        ManageService.GetAllInput().then((response) => {
            const sortedInput = response.data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
            setAllInput(sortedInput);
            setAllInputSave(sortedInput);
        })
    }
    const returnInputType = () => {
        ManageService.GetInputType().then((response) => {
            setInputType(response.data)
        })
    }
    const deleteInputId = (id) => {
        ManageService.DeleteInputId(id).then((response) => {
               toast.success("xóa thành công !");
               setLoad(true)
        })
    }
    const PostInputInUser = () => {
        let inPut = {
            id: editingRowId,
            title: selectedInputTypeE,
            money: editedMoney,
        }
        ManageService.PostInputEdit(inPut).then((response) => {
            console.log(response)
            setLoad(true)
            toast.success("Chỉnh sửa thành công !")
            localStorage.removeItem("load")
            let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            let randomIndex = Math.floor(Math.random() * arr.length);
            let randomElement = arr[randomIndex];
            localStorage.setItem("load", randomElement.toString());
        }).catch((err) => {
            console.log(err)
            toast.error("Chỉnh sửa không thành công !")
        })
    }
    const handEditInputChange = (id, money,type) => {
        setEditingRowId(id === editingRowId ? null : id);
            setEditedMoney(money);
            setSelectedInputTypeE(type)
    }
    const handleInputChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedInputType(selectedValue);
        const filteredInputs = selectedValue
            ? allInputSave.filter((ai) => ai.title === selectedValue)
            : allInputSave;
        setAllInput(filteredInputs);
    };
    const handleInputChangeEdit = (e) => {
        const selectedValue = e.target.value;
        setSelectedInputTypeE(selectedValue)
    };

    const handleEditedMoneyChange = (e) => {
        setEditedMoney(e.target.value);
    }
    const handleSearch = () => {
        let filteredInputs = allInputSave;
        if (searchDate) {
            filteredInputs = filteredInputs.filter(
                (ai) => formatDateTime(ai.createAt).includes(searchDate)
            );
        }
        if (searchMoney) {
            filteredInputs = filteredInputs.filter(
                (ai) => ai.money.toString().includes(searchMoney)
            );
        }

        setAllInput(filteredInputs);
    };
    const resetSearch = () => {
        setSearchDate("");
        setSearchMoney("");
        setAllInput(allInputSave);
    };

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
        <div style={{border: "1px solid black", marginTop: "25px", height: "671px"}}>
            <div style={{textAlign: "center", width: "100%", backgroundColor: "#3000ff", color: "white"}}>
                <h1 style={{fontWeight: "bold"}}>Lịch sử thu nhập</h1>
            </div>
            <div style={{width: "100%", marginBottom: "20px", marginTop: "15px", display:"flex"}}>
                <div style={{width: "320px", marginLeft: "20px", display: "flex"}}>
                    <div style={{width: "150px"}}>
                        <label style={{}} htmlFor="inputType">Chọn loại thu nhập : </label>
                    </div>
                    <select style={{border: "1px solid grey", borderRadius: "5px", textAlign: "center"}} id="inputType"
                            onChange={handleInputChange} value={selectedInputType || ''}>
                        <option value="">Tất cả</option>
                        {inputType.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ width: "320px", marginLeft: "20px", display: "flex" }}>
                    <div style={{ width: "150px" }}>
                        <label style={{}} htmlFor="inputDate">
                            Ngày tháng năm:
                        </label>
                    </div>
                    <input
                        type="text"
                        style={{ border: "1px solid grey", borderRadius: "5px", textAlign: "center" }}
                        id="inputDate"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        placeholder="Nhập ngày tháng năm"
                    />
                </div>
                <div style={{ width: "320px", marginLeft: "20px", display: "flex" }}>
                    <div style={{ width: "150px" }}>
                        <label style={{}} htmlFor="inputMoney">
                            Số tiền:
                        </label>
                    </div>
                    <input
                        type="number"
                        style={{ border: "1px solid grey", borderRadius: "5px", textAlign: "center" , marginRight : "70px"}}
                        id="inputMoney"
                        value={searchMoney}
                        onChange={(e) => setSearchMoney(e.target.value)}
                        placeholder="Nhập số tiền"
                    />
                </div>
                <div style={{display :"flex"}}>
                    <button className={"button-input-search"} onClick={handleSearch}>Tìm kiếm</button>
                    <button className={"button-input-search"} onClick={resetSearch} style={{marginLeft : "20px"}}>Reset</button>
                </div>
            </div>
            <table style={{width: "1185px", overflowY: "scroll"}}>
                <thead>
                <tr>
                    <th>Ngày</th>
                    <th>Loại thu nhập</th>
                    <th>Số tiền</th>
                    <th>Chỉnh sửa</th>
                </tr>
                </thead>
                <tbody>
                {allInput.map((ai) => (
                    <tr key={ai.id}>
                        <td>{formatDateTime(ai.createAt)}</td>
                        <td>
                            {editingRowId == ai.id ? (
                                <select id={"select-title"+ai.id} style={{border: "1px solid grey", borderRadius: "5px", textAlign: "center"}}
                                       onChange={handleInputChangeEdit} value={selectedInputTypeE}>
                                    {inputType.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                ai.title
                            )}
                        </td>
                        <td>
                            {editingRowId == ai.id ? (
                                <input style={{textAlign: "center", width: "110px"}} type="number" value={editedMoney}
                                       onChange={handleEditedMoneyChange}/>
                            ) : (
                                `${ai.money} VND`
                            )}
                        </td>
                        <td style={{textAlign: "center", display: "flex", justifyContent: "center" , height : "45px"}}>
                            <MdEdit onClick={() => handEditInputChange(ai.id, ai.money,ai.title)}
                                    style={{color:"darkorange" , fontSize : "22PX"}}/>
                            <MdDelete style={{marginLeft :"15px" , color : "red" , fontSize : "22PX"}} onClick={()=>deleteInputId(ai.id)}/>
                            {editingRowId == ai.id ?
                            (<MdSave style={{marginLeft: "15px" , color:"blue" , fontSize : "22PX"}} onClick={()=>PostInputInUser()}/>)
                                : <></>}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Income;