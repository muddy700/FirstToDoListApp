import React , {Component } from 'react'

export default class ItemForm extends Component {

        state={
            nameError : false,
            categoryError : false,
            availabilityError : false,
            errorMessage : '' , 
            buttonController : true
        }
        handleError = () => {
            const { activeItem, isEdit } = this.props

            if (activeItem.name === '') {
                this.setState(({ nameError: true , errorMessage : 'Enter Item Name' }))
            }
            else if (activeItem.name.length < 4) {
                this.setState(({ errorMessage: 'Enter atleast 4 characters' }))
            }
            else if (activeItem.category === '') {
                this.setState(({ categoryError: true, nameError: false , errorMessage :' Select Category'}))
            }
            else if (activeItem.availability === '') {
                this.setState(({ availabilityError: true, categoryError: false , errorMessage : 'Select Status' }))
            }
            else {
                this.setState(({ availabilityError: false , buttonController : false }))
            }

        }


    handleSubmit = () => {
                    // const { isEdit } = this.props

        const { activeItem, isEdit } = this.props

        if (activeItem.name === '') {
            this.setState(({ nameError: true, errorMessage: 'Enter Item Name' }))
        }
        else if (activeItem.name.length < 4) {
            this.setState(({ errorMessage: 'Enter atleast 4 characters' }))
        }
        else if (activeItem.category === '') {
            this.setState(({ categoryError: true, nameError: false, errorMessage: ' Select Category' }))
        }
        else if (activeItem.availability === '') {
            this.setState(({ availabilityError: true, categoryError: false, errorMessage: 'Select Status' }))
        }
        else {
            this.setState(({ availabilityError: false }))

            isEdit ? this.props.saveEdited() : this.props.whenSubmit()

            this.setState({ buttonController : true , nameError : false , categoryError : false , availabilityError : false})
            // if(isEdit){
            //     this.props.saveEdited() 
            // }
            // else 
            // {
            //     this.props.whenSubmit()
            // }
          

        }

    }
    hanleChange=(e)=>{
        const { name, value } = e.target
        this.props.whenChange({ [name]: value })
    }


    render() {
        const { name , category , availability } = this.props.activeItem
        const { isEdit , categories } = this.props
        const { nameError , categoryError , errorMessage , availabilityError } = this.state

        const categ = categories.map((data) =>   <option value={data.name} key={data.id}>{data.name}</option>)
        return(
            <div className="countingBox1">
                <h1>{isEdit ? 'Fill To Update An Item' : 'Fill To Add An Item'}</h1>

                <form>
                    <label style={ {color : nameError ? 'red' : 'black'} }>Item Name</label> &nbsp; &nbsp; &nbsp;
                    <input type="text" value={name} onChange={this.hanleChange} name="name" onKeyUp={this.handleError} autoFocus /> <br /> 
                    <label>{nameError ? errorMessage : ''} </label>
                    <br /> <br /> <br />

                    <label style={{ color: categoryError ? 'red' : 'black' }}>Item Category</label>  &nbsp;
                    <select value={category} name="category" onChange={this.hanleChange} onKeyUp={this.handleError}>
                        <option value="----Select Category----">----Select Category----</option>
                        {categ} 
                        {/* <option value="Transport">Transport</option>
                        <option value="Phone">Phone</option>
                        <option value="Building Material">Building Material</option>
                        <option value="Other">Other</option> */}
                    </select> <br />  <label>{categoryError ? errorMessage : ''} </label>
                    <br /> <br /> <br />

                    <label style={{ color: availabilityError ? 'red' : 'black' }}>Availability</label>  &nbsp; &nbsp;  &nbsp;
                     <select value={availability} name="availability" onChange={this.hanleChange} onKeyUp={this.handleError} >
                        <option >----Select Status----</option>
                         <option value="True">True</option>
                         <option value="False">False</option>
                    </select> <br /> <label>{availabilityError ? errorMessage : ''} </label>
                    <br />

                    <input type="button" disabled={this.state.buttonController ? true : false} className="submitButton" value={isEdit ? 'Update' : 'Add'} onClick={this.handleSubmit}/ >
                </form>
            </div>
        )
    }
}