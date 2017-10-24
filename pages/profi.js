module.exports = {
  elements: {
  	title: 'h2.titleH1.experts__header-text',
    citylist: 'div#select2-drop'
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
  		elements: {
  			service: 'div#s2id_autogen5',
  			geo: 'div#s2id_autogen7',
  			searchButton: 'button.btn-block.btn-middle'
  		}
  	},
    content: {
      selector: 'main#content div.l-center',
      elements: {
        offers: 'ul.listCol__list.js-profiles-list',
        price: 'b.completed_orders__order__details__price'
      }
    }
  }
};
