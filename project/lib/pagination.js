module.exports = function(Model){
  Model.paginate = async function({page, perPage, numPage, subQuery, withAssociation, ...params}){
    page = parseInt(page) || 1;
    perPage = parseInt(perPage) || 20;
    numPage = parseInt(numPage) || 10;
    withAssociation = typeof withAssociation === 'boolean' || false;

    const options = Object.assign({
      limit : perPage,
      offset : perPage * (page - 1),
    }, params);
    const rows = await Model.findAll({
      ...options,
      subQuery: subQuery != undefined ? subQuery : true,
    });

    const optionsForCount = Object.keys(options).reduce((acc, key) =>{
      if(!['include', 'limit', 'offset', 'order'].includes(key)){
        acc[key] = options[key];
      }
      if(withAssociation && key == 'include'){
        acc[key] = options[key];
      }
      return acc;
    }, {});
    const count = await Model.count(optionsForCount);
    if(!count){
      return [{ pages : [], previousDisabled : true, nextDisabled : true }, rows];
    }
    const pageMax = Math.ceil(count/perPage);
    const startPage = Math.max(1, page - (numPage / 2));
    let endPage = Math.min(startPage + numPage, pageMax);
    const pages = [];
    for(let i = startPage; i <= endPage; i++){
      pages.push(i);
    }
    const pagination = { page, count, perPage, pages, previousDisabled : startPage == 1, nextDisabled : endPage == pageMax}
    return [pagination, rows]

  }
}
