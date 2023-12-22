import React, {useEffect, useState} from 'react';
import ManageService from "../../../service/ManageService";
import {toast} from "react-toastify";
import {MdEdit, MdSave} from "react-icons/md";

const Spending = () => {
    const [allOutput, setAllOutput] = useState([]);
    const [allOutputSave, setAllOutputSave] = useState([]);
    const [outputType, setOutputType] = useState([]);
    const [selectedOutputType, setSelectedOutputType] = useState(null);
    const [selectedOutputTypeE, setSelectedOutputTypeE] = useState('');
    const [editingRowId, setEditingRowId] = useState(null);
    const [editedMoney, setEditedMoney] = useState('');
    const [load, setLoad] = useState(true);
    useEffect(() => {
        returnAllOutput()
        returnOutputType()
        setLoad(false)
    }, [load]);
    const returnAllOutput = () => {
        ManageService.GetAllOutPut().then((response) => {
            const sortedOutput = response.data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
            setAllOutput(sortedOutput);
            setAllOutputSave(sortedOutput);
        })
    }
    const returnOutputType = () => {
        ManageService.GetAllCategories().then((response) => {
            setOutputType(response.data)
        })
    }
    const PostOutputInUser = () => {
        let output = {
            id: editingRowId,
            expenseType: selectedOutputTypeE,
            money:editedMoney,
        }
        ManageService.PostOutPutEdit(output).then((response) => {
            console.log(response)
            localStorage.removeItem("load")
            let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            let randomIndex = Math.floor(Math.random() * arr.length);
            let randomElement = arr[randomIndex];
            localStorage.setItem("load", randomElement.toString());
            toast.success("Chỉnh sửa thành công !")
            setLoad(true)
        }).catch((err) => {
            console.log(err)
            toast.error("Chỉnh sửa không thành công !")
        })
    }
    const handEditOutputChange = (id, money,type) => {
        console.log(type)
        console.log(money)
        console.log(id)
        setEditingRowId(id == editingRowId ? null : id);
            setEditedMoney(money);
            setSelectedOutputTypeE(type)
    }
    const handleOutputChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOutputType(selectedValue);
        const filteredOutputs = selectedValue
            ? allOutputSave.filter((ao) => ao.expenseType === selectedValue)
            : allOutputSave;
        setAllOutput(filteredOutputs);
    };
    const handleOutputChangeEdit = (e) => {
        const selectedValue = e.target.value;
        console.log(e.target.value)
        setSelectedOutputTypeE(selectedValue)
    };

    const handleEditedMoneyChange = (e) => {
        setEditedMoney(e.target.value);
    }
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
                <h1 style={{fontWeight: "bold"}}>Lịch sử chi tiêu</h1>
            </div>
            <div style={{width: "100%", marginBottom: "20px", marginTop: "15px"}}>
                <div style={{width: "320px", marginLeft: "20px", display: "flex"}}>
                    <div style={{width: "150px"}}>
                        <label style={{}} htmlFor="outputType">Chọn loại chi tiêu : </label>
                    </div>
                    <select
                        id={"select-title"}
                        style={{ border: "1px solid grey", borderRadius: "5px", textAlign: "center" }}
                        onChange={handleOutputChange}
                        value={selectedOutputTypeE}
                    >
                        {outputType.map((type) => (
                            <optgroup key={type.id} label={type.name}>
                                <option value="">Tất cả</option>
                                {type.nameCategories.map((subCategory) => (
                                    <option
                                        key={subCategory.id}
                                        value={subCategory.name}
                                    >
                                        {subCategory.name}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
            </div>
            <table style={{width: "1185px", overflowY: "scroll"}}>
                <thead>
                <tr>
                    <th>Ngày</th>
                    <th>Loại chi tiêu</th>
                    <th>Số tiền</th>
                    <th>Chỉnh sửa</th>
                </tr>
                </thead>
                <tbody>
                {allOutput.map((ao) => (
                    <tr key={ao.id}>
                        <td>{formatDateTime(ao.createAt)}</td>
                        <td>
                            {editingRowId == ao.id ? (
                                <select
                                    style={{ border: "1px solid grey", borderRadius: "5px", textAlign: "center" }}
                                    onChange={handleOutputChangeEdit}
                                    value={selectedOutputTypeE}
                                >
                                    {outputType.map((type) => (
                                        <optgroup key={type.id} label={type.name}>
                                            {type.nameCategories.map((subCategory) => (
                                                <option
                                                    key={subCategory.id}
                                                    value={subCategory.name}
                                                >
                                                    {subCategory.name}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>

                            ) : (
                                ao.expenseType
                            )}
                        </td>
                        <td>
                            {editingRowId == ao.id ? (
                                <input style={{textAlign: "center", width: "110px"}} type="number" value={editedMoney}
                                       onChange={handleEditedMoneyChange}/>
                            ) : (
                                `${ao.money} VND`
                            )}
                        </td>
                        <td style={{textAlign: "center", display: "flex", justifyContent: "center"}}><MdEdit
                            onClick={() => handEditOutputChange(ao.id, ao.money,ao.expenseType)} style={{color:"red"}}/>
                            {editingRowId == ao.id ? (<MdSave style={{marginLeft: "15px" , color:"blue"}} onClick={()=>PostOutputInUser()}/>) : <></>}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default Spending;