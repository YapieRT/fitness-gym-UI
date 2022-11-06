import React from 'react'
import Select from 'react-select'

const options = [
  { value: 'user', label: 'Client' },
  { value: 'admin', label: 'Manager' } 
]
const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "#313131",
            // match with the menu
         borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            //Overwrittes the different states of border
        borderColor: state.isFocused ? "none" : "none",
            //Removes weird border around container
         boxShadow: state.isFocused ? null : null,
        "&:hover": {
           //Overwrittes the different states of border
           borderColor: state.isFocused ? "none" : "none"
        }
      }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  };
  

const MyComponent = () => (
  <Select styles={customStyles} options={options} />
)
export default MyComponent