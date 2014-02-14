$(function() {

  App.Collections.listRCollection = Backbone.Collection.extend({

  
	url: function() {
      if(this.major==true)
      return App.Server + '/collectionlist/_design/bell/_view/majorcatagory?include_docs=true'
      else if(this.major==false)
      return App.Server + '/collectionlist/_design/bell/_view/subcategory?include_docs=true'
      else
      return App.Server + '/collectionlist/_design/bell/_view/allrecords?include_docs=true'
    },
    parse: function(response) {
      
      var docs = _.map(response.rows, function(row) {
        return row.doc
      })
      return docs
    },
    comparator: function(item) {
        return item.get("CollectionName");
    },
    sortByField: function() {
        this.sort_key = "CollectionName";
        this.sort();
    },
     
    model: App.Models.CollectionList,

  })

})
