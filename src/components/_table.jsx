import React from "react";
import MaterialTable from 'material-table';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import download from 'downloadjs'

class MaterialDataTable extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            rowIndex: '',
        }
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
                        <a href="#" onClick={() => this.downloadCertificate(rowData)}>Download Certificate</a>
                    </React.Fragment >
                )
            }
        )
    }

    async downloadCertificate(item) {
        const url = "/Certificate.pdf"

  		const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        // Embed the Helvetica font
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        // Get the first page of the document
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]

        // Get the width and height of the first page
        const { width, height } = firstPage.getSize()

        // Draw a string of text diagonally across the first page
        firstPage.drawText(`${item['Attendee Name']} - ${item['City']}`, {
            x: 320,
            y: 330,
            size: 20,
            font: helveticaFont,
            top:400,
            color: rgb(0.9,0.4,0.1),
        })

        firstPage.drawText(item['Ticket_Name'], {
            x: 330,
            y: 278,
            size: 15,
            font: helveticaFont,
            color: rgb(0.9,0.4,0.1),
        })

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()
        download(pdfBytes, `${item['Attendee Name']}_${item['City']}_Certificate.pdf`, "application/pdf");
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