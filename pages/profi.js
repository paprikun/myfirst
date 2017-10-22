module.exports = {
  elements: {
  	title: 'h2.titleH1.experts__header-text'
  },
  sections: {
  	header: {
  		selector: 'div#header',
  		elements: {
  			city: 'div.header__geo.widget a',
  			myOrders: 'a.auth__link'
  		}
  	},
  	search: {
  		selector: 'form.form.form-searchExpert',
  		elemets: {
  			service: 'div#s2id_autogen5',
  			geo: 'div#s2id_autogen7',
  			searchButton: 'button.btn-block.btn-middle'
  		}
  	}
  }
};
