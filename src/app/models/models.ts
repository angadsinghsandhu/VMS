export interface userModel {
    // _id: any,
    name: string,
    emp_id: number,
    level: string,
    email: any,
    contact_info: any,
    entrys: Array<entryModel>,
    // password: any,
    // __v: number
}

export interface entryModel {
    active: boolean,
    pass_id: number,
    accompany: number,
    _id: any,
    name: string,
    emp_id: number,
    visit_date: Date,
    remarks: string,
    entry_time: string,
    exit_time: string
}
