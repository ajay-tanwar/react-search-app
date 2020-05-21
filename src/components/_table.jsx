import React from "react";
import MaterialTable from 'material-table';
import Certificate from '../data/Certificate.jpg'

class MaterialDataTable extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isSelection: false,
        }
    }

    onSelectionChange = () => {
        this.setState({
            isSelection: !this.state.isSelection,
        })
    }

    getCertificate = () => {
        window.open(Certificate, 'Download'); 
    }

    TableAction = () => {
        const {isSelection} = this.state
        return (
            {
                field: 'action',
                title: 'Action',
                sorting: false,
                filtering: false,
                render: rowData => (
                    <React.Fragment>
                        {isSelection ? <a href={Certificate} download>Get Certificate</a> : null}
                    </React.Fragment >
                )
            }
        )
    }

    render() {
        const {data} = this.props
        const {isSelection} = this.state
        const columns = []
        const actions = []
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

        columns.push(this.TableAction())

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
                    onSelectionChange={this.onSelectionChange}
                    actions={actions}
                />
            </div>
        )
    }
}

export default MaterialDataTable;