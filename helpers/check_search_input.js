module.exports = (column) =>{
    if(column == ''){
      return "%%"
    }else{
      return `%${column}%`
    }
  }