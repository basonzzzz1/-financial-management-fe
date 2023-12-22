import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Card from "components/card";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "assets/css/MiniCalendar.css";
import ManageService from "../../service/ManageService";
import Modal from "react-modal";
import { toast } from "react-toastify";

const MiniCalendar = () => {
    const [allInput, setAllInput] = useState([]);
    const [allOutput, setAllOutput] = useState([]);
    const [value, onChange] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDataInput, setSelectedDataInput] = useState(null);
    const [selectedDataOutput, setSelectedDataOutput] = useState(null);

    useEffect(() => {
        returnAllInput();
        returnAllOutput();
    }, []);

    useEffect(() => {
        const formattedDate = value.toISOString().split("T")[0];
        const filteredInput = allInput.filter(
            (input) => input.createAt.split("T")[0] === formattedDate
        );
        const filteredOutput = allOutput.filter(
            (output) => output.createAt.split("T")[0] === formattedDate
        );
        if (filteredInput.length > 0 && filteredOutput.length > 0) {
            setSelectedDataInput(filteredInput[0]);
            setSelectedDataOutput(filteredOutput[0]);
            setModalIsOpen(true);
        } else if (filteredInput.length > 0 && filteredOutput.length <= 0) {
            setSelectedDataInput(filteredInput[0]);
            setModalIsOpen(true);
        } else if (filteredInput.length <= 0 && filteredOutput.length > 0) {
            setSelectedDataOutput(filteredOutput[0]);
            setModalIsOpen(true);
        } else {
            setModalIsOpen(false);
        }
    }, [value]);

    const returnAllInput = () => {
        ManageService.GetAllInput().then((response) => {
            const sortedInput = response.data.sort(
                (a, b) => new Date(b.createAt) - new Date(a.createAt)
            );
            setAllInput(sortedInput);
        });
    };
    const returnAllOutput = () => {
        ManageService.GetAllOutPut().then((response) => {
            const sortedOutput = response.data.sort(
                (a, b) => new Date(b.createAt) - new Date(a.createAt)
            );
            setAllOutput(sortedOutput);
        });
    };

    const formatDateString = (dateString) => {
        const dateObject = new Date(dateString);
        const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
        return formattedDate;
    };

    const closeModal = () => {
        setSelectedDataInput(null);
        setSelectedDataOutput(null);
        setModalIsOpen(false);
    };

    return (
        <div>
            <Card extra="flex w-full h-full flex-col px-3 py-3">
                <Calendar
                    onChange={onChange}
                    value={value}
                    prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 " />}
                    nextLabel={<MdChevronRight className="ml-1 h-6 w-6 " />}
                    view={"month"}
                />
            </Card>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        width: "850px",
                        height: "250px",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        overlay: {
                            backgroundColor: "rgba(0,0,0,0)",
                        },
                        border : "1px solid black",
                        scroll : "none",
                        overflow : "hidden",
                    },
                }}
                id="myCustomModalId"
            >

                <div id={"div-modal-1"} style={{ flex: 1, paddingRight: "20px" }}>
                    {/* Chi tiêu */}
                    {selectedDataOutput && (
                        <div>
                            <h2>Chi tiêu ngày {formatDateString(selectedDataOutput.createAt)}</h2>
                            {allOutput
                                .filter(
                                    (output) =>
                                        output.createAt.split("T")[0] ===
                                        selectedDataOutput.createAt.split("T")[0]
                                )
                                .map((outputItem) => (
                                    <div key={outputItem.id}>
                                        <p>Loại chi tiêu: {outputItem.expenseType}</p>
                                        <p>Số tiền: {outputItem.money} VND</p>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                <div id={"div-modal-2"} style={{ flex: 1, paddingLeft: "20px" }}>
                    {/* Thu nhập */}
                    {selectedDataInput && (
                        <div>
                            <h2>Thu nhập ngày {formatDateString(selectedDataInput.createAt)}</h2>
                            {allInput
                                .filter(
                                    (input) =>
                                        input.createAt.split("T")[0] ===
                                        selectedDataInput.createAt.split("T")[0]
                                )
                                .map((inputItem) => (
                                    <div key={inputItem.id}>
                                        <p>Loại thu nhập: {inputItem.title}</p>
                                        <p>Số tiền: {inputItem.money} VND</p>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                <button id={"miniCalendar-close-modal"} onClick={closeModal}>
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default MiniCalendar;
