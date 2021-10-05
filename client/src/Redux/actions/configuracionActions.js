import { apiAllStudents } from "../../api/api";
import types from "../types";

export const solicitarAllStudents = async (setState) => {
    const { data } = await apiAllStudents();
    let { total } = data.pop();
    setState({ totalStudents: total, StudentsByGrado: data })
}

export const setDataUser = (data) => ({
    type: types.setDataUser,
    payload: data
})


export const existeRolDirector = () => ({ type: types.existeRolDirector });

export const existeRolCoordinador = () => ({ type: types.existeRolCoordinador });