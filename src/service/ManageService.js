import axios from "axios";
import {
    AllCategories, AllInput,
    AllOutPut,
    ExpenseInUser, OutPut,
    TotalInputThisMonth,
    TotalOutputThisMonth,
    YearlyRevenues,
    Input, InputType
} from "../API/api";
    const ManageService = {
    TotalInputMonth: () => {
        return new Promise((resolve, reject) => {
            axios.get(TotalInputThisMonth,
                {
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    resolve(response);
                  console.log(response)
                })
                .catch(function (err) {
                    reject(err)
                });
        });
    },
        TotalOutputMonth: () => {
            return new Promise((resolve, reject) => {
                axios.get(TotalOutputThisMonth,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        ExpenseInUserLog: () => {
            return new Promise((resolve, reject) => {
                axios.get(ExpenseInUser,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        GetYearlyRevenues: () => {
            return new Promise((resolve, reject) => {
                axios.get(YearlyRevenues,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        GetAllCategories: () => {
            return new Promise((resolve, reject) => {
                axios.get(AllCategories,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        GetAllOutPut: () => {
            return new Promise((resolve, reject) => {
                axios.get(AllOutPut,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        GetAllInput: () => {
            return new Promise((resolve, reject) => {
                axios.get(AllInput,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        PostInput: (input) => {
            return new Promise((resolve, reject) => {
                axios.post(Input,input,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        PostOutPut: (outPut) => {
            return new Promise((resolve, reject) => {
                axios.post(OutPut,outPut,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
        GetInputType: () => {
            return new Promise((resolve, reject) => {
                axios.get(InputType,
                    {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('userToken')),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        resolve(response);
                        console.log(response)
                    })
                    .catch(function (err) {
                        reject(err)
                    });
            });
        },
}
export default ManageService;
