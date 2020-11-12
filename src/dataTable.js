import React , { useState , Component , useEffect } from 'react'
import './index.css'


const TableHead = (props) => {

    const { handleSelectAll , allSelected } =props

        return(
                    <tr>
                        <th><input type="checkbox" onClick={handleSelectAll}  checked={allSelected}/></th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Availability</th>
                        <th>Action1</th>
                        <th>Action2</th>
                        {/* <th>Action3</th> */}
                    </tr>
        )
                    }

const TableBody = (props) => {
    const { isFiltered , filtered , items ,checkedItem , selectAll } = props 

    
     // if(!allSelected){
    //     setSelectAll(false)
    // }


    const arrayToMap = isFiltered ? filtered : items
    
    const rows =arrayToMap.map((row) => {
        return (
            <tr key={row.id}>
                <td><input type="checkbox" onClick={() => checkedItem(row.id)} checked={row.isSelected} /> </td>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.category}</td>
                <td>{row.availability}</td>
                <td> <input type="button" className="editButton"  onClick={() => props.whenEdit(row.id)} value="Edit"  /> </td>
                <td><input type="button" className="editButton" onClick={() => props.removeItem(row.id)} value="Delete" disabled={row.isSelected}/> </td>
            </tr>
        )
    })


    // const rows2 = filtered.map((row) => {
    //     return (
    //         <tr key={row.id}>
    //             <td><input type="checkbox" onClick={() => checkedItem(row.id)} checked={row.isSelected} /> </td>
    //             <td>{row.id}</td>
    //             <td>{row.name}</td>
    //             <td>{row.category}</td>
    //             <td>{row.availability}</td>
    //             <td> <input type="button" className="editButton" onClick={() => props.whenEdit(row.id)} value="Edit" /> </td>
    //             <td><input type="button" className="editButton" onClick={() => props.removeItem(row.id)} value="Delete" /> </td>
    //             <td><input type="checkbox" /> </td>
    //         </tr>
    //     )
    // })
    
    // if(isFiltered) {
    //     return <tbody>{rows2}</tbody>
    // }
    // else {
    //     return <tbody>{rows1}</tbody>
        return <tbody>{rows}</tbody>

    // }


}

const Filter = (props)=> {

    const { items, filtered, selectedItems, handleFilter , selectAll, deleteAll } = props

    const message = filtered.length === 1 ? ' Item Was Found' : ' Items Was Found'

    const message2 = selectedItems.length === 1 ? ' Item Selected' : ' Items Selected'


    if(items.length !== 0 ){
    return(
        <div>
            <form>
                <label>Filter By </label> &nbsp;  &nbsp;
                <select name="filterOption" value={null} onChange={ (e) => props.receive(e.target.value)}>
                    <option value='All'>----Choose Option</option>
                    <option value='All'> Show All</option>
                    <option value="Transport"> Transport Category</option>
                    <option value="Phone"> Phone Category</option>
                    <option value="Building Material"> Building Category</option>
                    <option value="Other">Other Category</option>
                <option value="Available"> Availability (True) </option>
                    <option value="Navailable"> Availability (False) </option>
                    
                </select>  &nbsp;  &nbsp;
                <input type="button" value="Filter" onClick={handleFilter} />
                <br />  <br />  <br />

                <lablel> { filtered.length !== 0 ? filtered.length + message : ''}  </lablel> 

                <br />  <br /> <br />
                {/* <button >Selected Items</button> */}
                <label >{selectedItems.length >0 ? selectedItems.length + message2 : ''}</label>  &nbsp; &nbsp;
                <input type="button" onClick={deleteAll} className="editButton" style={{backgroundColor : 'red'}} value="Delete Selected" disabled={selectedItems.length <= 0} />

            </form>
        </div>
    )  }
    else {
        return null
    }
}

const Table = (props) => {
    const [selectAll, setSelectAll] = useState(false)
    // const [selectionStatus , setSelectionStatus] = useState(false)
    const { items, selectAllItems, allSelected , handleFilter, removeItem, receive, whenEdit, deleteMultiple , selectedItems, activeItem, filtered, checkedItem, isFiltered, deleteAll } = props


    // if(items.length === selectedItems.length) {
    //     setSelectionStatus(true)
    // }
    // else{
    //     setSelectionStatus(false)
    // }
    const handleSelectAll = () => {
        setSelectAll(!selectAll)
        selectAllItems()
    }

    const handleDeteleAll = () => {

            selectAll ?  deleteAll() : deleteMultiple()
        // handleSelection()
        setSelectAll(false)

    }
    const message = items.length === 1 ? ' Item Stored' : ' Items Stored'
    // if(!allSelected){
    //     setSelectAll(false)
    // }

    //clickup
    return(

            <div className="countingBox2">
                <div className="tableDiv">
                    <table className="table1">
                        <caption>{items.length < 1 ? 'Saved Items Will Be Stored In The Table Bellow ' :   items.length + message} </caption>
                    <TableHead allSelected={allSelected} handleSelectAll={handleSelectAll} />
                        <TableBody  selectAll={selectAll} checkedItem={checkedItem} items={items} whenEdit={whenEdit} activeItem={activeItem} filtered={filtered} isFiltered={isFiltered} removeItem={removeItem}/>
                    </table>
                </div>
                <div className="filterDiv">
                <Filter deleteAll={handleDeteleAll} selectAll={selectAll} selectedItems={selectedItems} items={items}  filtered={filtered} receive={receive} handleFilter={handleFilter}  isFiltered={isFiltered}/>
                </div>
            </div>
    )

}
          

export default Table