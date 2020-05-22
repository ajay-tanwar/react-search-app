import React from "react";
import MaterialTable from 'material-table';
import Certificate from '../data/Certificate.jpg'

class MaterialDataTable extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            rowIndex: '',
        }
        console.log(Certificate)
    }

    onSelectionChange = (rows) => {
        this.setState({
            rowIndex: rows
        })
    }

    Actions = () => {
        const {rowIndex} = this.state
        return (
            {
                field: 'action',
                title: 'Action',
                sorting: false,
                filtering: false,
                render: rowData => (
                    <React.Fragment>
                        {rowIndex && rowIndex.find(o => o['Registration Id'] === rowData['Registration Id']) ? <a href={Certificate} download={`Certificate_${rowData['Registration Id']}`}>Get Certificate</a> : null}
                    </React.Fragment >
                )
            }
        )
    }

    render() {
        const {data} = this.props
        const columns = []
        columns.push({
            title: "Registration Id",
            field: "Registration Id"
        })
        columns.push({
            title: "Attendee Name",
            field: "Attendee Name"
        })
        columns.push({
            title: "Ticket_Name",
            field: "Ticket_Name"
        })

        columns.push(this.Actions())

        const options = {
            selection: true,
            actionsColumnIndex: -1,
            search: true,
            sorting: true,
            filtering: true,
        }
        return(
            <div>
                <MaterialTable                    
                    title="Filter Data"
                    data={data}
                    options={options}
                    columns={columns}
                    onSelectionChange={(rows) => this.onSelectionChange(rows)}
                />
            </div>
        )
    }
}

export default MaterialDataTable;