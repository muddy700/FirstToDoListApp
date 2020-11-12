import React, { Component , useEffect } from 'react'
import ItemForm from './dataForm'
import Table from './dataTable'

let id = 0

class App extends Component {

  state = {
    item :[] ,
    filtered: [] ,

    currentItem : {
      id : 0 ,
      name : '' ,
      category : '' ,
      availability : '' ,
      isSelected : false
    },

    isEdit : false,
    filterOption : '',
    isFiltered : false , 
    // isChecked : false
    selectedItems : [] ,
    allSelected : false ,
    categories : [
          {id : 1 , name : 'Transport'} , 
          {id :2 , name : 'Phone'} ,
          {id :3 , name : 'Building Material'} , 
          {id : 4 , name : 'Other'}]
  }
    receiveFilterOptions = (option) => {
      this.setState(({filterOption :  option }))

      // console.log(this.state.filterOption)
      // this.handleFilter()
      
    }
  // useEffect(() => {
  // this.handleFilter()
  // }, [filtered])

  selectAllItems = () => {
                // this.setState({ selectedItems : this.state.item}) old way 
                        const { item , allSelected , selectedItems } = this.state

                  if(allSelected) { 
                    const checkedItems = item.map((data) => {

                      return {...data, isSelected: false }
                    })
                    this.setState({ selectedItems: [] ,  allSelected : false , item : checkedItems})
                    console.log(" Dis-Selected All ")

                  }
                  else{
                    const UncheckedItems = item.map((data) => {

                      // return {...data, isSelected: true }
                      return data.id
                    }) 
                    const newItems = item.map((data) => {
                      // if (data.id === value) {
                        return { ...data, isSelected: true }
                      // }
                      // else return data
                    })
                    
                    this.setState({ selectedItems : UncheckedItems, allSelected : true , item : newItems})
                    console.log("  All  Selected")
                    }
                    // this.updateSelectedList()
                }

      handleFilter = () => {
        const { item , filterOption , isFiltered , filtered } = this.state
        this.setState(({isFiltered: true }))

        if(filterOption === 'All') {
          this.setState(({ filtered: item }))
        }
        else if(filterOption === 'Available') {
          const filteredList = item.filter((items) => items.availability === 'True')
          this.setState(({ filtered: filteredList}))

        }
        else if (filterOption === 'Navailable') {
          const filteredList = item.filter((items) => items.availability === 'False')
          this.setState(({ filtered: filteredList}))

        }
        else {
          
        const filteredList = item.filter((items) => items.category === filterOption)

          this.setState(({ filtered: filteredList}))
          // console.log(this.state.filtered.length() )
        }
        

      }

    hanleChange = (value) => {
      
      this.setState({
         currentItem : {...this.state.currentItem, ...value} ,
        
           } )
    }

   deleteAll = () => {
        this.setState({ item : [] , selectedItems : [] , allSelected : false})
      }

    deleteMultiple = () => {
          const { item , selectedItems }= this.state

          // const item2 = item.map((data) => {
          //   return data.id
          // })


      const item2 = item.filter((data) => !selectedItems.includes(data.id))  
      this.setState({ item : item2 , selectedItems : []})
          // const comparedItems = selectedItems.filter((data) => !item2.includes(data)
          //   // return !item.includes(data)
          //   )
          // console.log(comparedItems.length) 
          // this.setState({ selectedItems : [] })
        }

      updateSelectedList = () => {
            const { item } = this.state

            const selectedList = item.filter((data) => data.isSelected)

            this.setState({ selectedItems: selectedList })
          }

   checkedItem = (value) => {

                      const { item , selectedItems } = this.state

                      const isAdded  = selectedItems.filter((data) => selectedItems.includes(value) )
                      console.log(isAdded.length)

                      if(isAdded.length === 0) {
                        // this.setState({ selectedItems : [...selectedItems , value]})
                        const newItems = item.map((data) => {
                          if(data.id === value){
                            return {...data , isSelected : true}
                          }
                          else return data
                        })
                        this.setState({ item: newItems, selectedItems: [...selectedItems, value]})
                      }
                      else{
                        const newItems2 = item.map((data) => {
                          if (data.id === value) {
                            return { ...data, isSelected: false }
                          }
                          else return data
                        })
                        const newSelected = selectedItems.filter((data) => data !== value)
                        this.setState({ item: newItems2 , selectedItems : newSelected})


                      }

                    if (item.length === selectedItems.length){
                      this.setState({ allSelected : true})
                    }
                    if(item.length !== selectedItems.length){
                      this.setState({ allSelected : false})
                    }

                      // const newItemList = item.map((data) => {
                      //   if(data.id === value){
                      //     // this.setState({ currentItem : data, })
                      //     return {...data , isSelected : !data.isSelected}
                      //   }
                      //   return data
                      // })
                      // this.setState({ item: newItemList })

              // this.updateSelectedList()


                      // var reducedList = ''

                      // const repeatedId = selectedItems.find((data) => data.id === value || data === value)

                      // if(repeatedId !== value){
                      //   this.setState({ selectedItems: [...selectedItems, value] })
                      // }
                      // else {
                      //   const reducedList = selectedItems.filter((data) => data.id !== repeatedId || data !== repeatedId)
                      //   this.setState({ selectedItems: reducedList })


                      // }
                      // if (reducedList.length > 0){
                      // console.log("hellow")
                      // console.log(repeatedId)
                      // }
                              // this.setState({ selectedItems : item.filter((data) => data.isSelected === true)})

                      // selectedList = item.filter((data) => {
                      //  if(data.isSelected){
                      //         this.setState({ selectedItems: selectedList })
                      //         }
                      //       } )
              // console.log(selectedItems[0])



                      // const checkedItem1 = item.filter((char) => char.id === value )

                      // const newSelected = selectedItems.filter((data) => data !== value)
                      // this.setState({ selectedItems : [...selectedItems, newSelected] })

                      // this.setState({ selectedItems : [...selectedItems, checkedItem1] })
                      // this.setState({ selectedItems: newSelected })

                      // console.log(selectedItems.length)
                    }

      // selectMultiple = (value) => { 
      //   const { currentItem , item } = this.state
      //   const checkedItem = item.find((char) => char.id === value )
      //   // this.setState(({ currentItem : checkedItem}))
      
      //   if(checkedItem.isSelected){
      //     this.setState(({ currentItem : checkedItem , isSelected : false}))
      //   }
      //   else {
      //     this.setState(({ currentItem : checkedItem , isSelected : true})) 
      //     }

      //     this.handleEdit()
          
      //     const checkedItems = item.filter((char) => char.isSelected)
      //     this.setState(({ selectedItems : checkedItems}))
      //   // this.setState(({ selectedItems : [ ...this.state.selectedItems , value ]}))
      // }

      removeItem = (index) => {
        const {item , selectedItems } = this.state

        this.setState({
          item: item.filter((character) => character.id !== index)
        })
        this.setState({
          selectedItems : selectedItems.filter((char) => char.id !== index)
        })
      }

      editItem = (value) => {
        const { item } = this.state
        const selectedItem = item.find((items) => items.id === value)
        this.setState(({ currentItem: selectedItem, isEdit: true} ))
      }

      handleEdit = () => {
        const { item , currentItem } = this.state
        const editedItem = item.map((char) => char.id === currentItem.id ? currentItem : char )
        this.setState({ item: editedItem, currentItem : {id: null, name: '',  category: '',  availability: '' } , isEdit : false})

      }

    handleSubmit = () => {  
      id += 1
      
      this.setState({
          item : [...this.state.item, {...this.state.currentItem , id : id}] ,
        currentItem: {
          id: null,
          name: '',
          category: '',
          availability: ''}

        
      })
      
    }

  render(){
  return (
    <div className="container">
      <ItemForm categories={this.state.categories} isEdit={this.state.isEdit} saveEdited={this.handleEdit} whenChange={this.hanleChange} whenSubmit={this.handleSubmit} activeItem={this.state.currentItem}/>
      <Table allSelected={this.state.allSelected} deleteMultiple={this.deleteMultiple} selectAllItems={this.selectAllItems} deleteAll={this.deleteAll} selectedItems={this.state.selectedItems} checkedItem={this.checkedItem}  handleFilter={this.handleFilter}  isFiltered={this.state.isFiltered} receive={this.receiveFilterOptions} whenEdit={this.editItem} removeItem={this.removeItem} filtered={this.state.filtered} items={this.state.item}/>
    </div>
  );
  }
}

export default App;
