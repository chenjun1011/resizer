KISSY.use("dom, event",function(S,DOM,Event){

	var itemEls = DOM.query('li','.items');
    Event.on(itemEls,'click',function(){
		//DOM.removeClass(itemEls,'colspan rowspan');
	    DOM.toggleClass(this,'colspan rowspan');
		Resizer.init();
	});
	
	
    var Resizer = {
		
        defaultCfg:{
            itemWidth:170,
            selector:".items",
			max_col:6,
			max_row:10
        },
		
        init:function(cfg){
            var self = this;
            self.cfg = S.merge(self.defaultCfg, cfg);         
						
            var w = self.cfg.itemWidth;
			var max_col = self.cfg.max_col;
			var max_row = self.cfg.max_row;
						
			var blocks = new Array();			
			for(var i = 0;i < max_row;i++){
				blocks[i] = new Array();
				for(var j = 0;j < max_col;j++){
					blocks[i][j]=0;
				}
			}

			var items = DOM.query("li",self.cfg.selector);
            S.each(items,function(item){
				var cell_height = 1,
					cell_width = 1;
				var cls = DOM.attr(item,'class');
				
				if (cls.indexOf('rowspan') > -1) {
					cell_height = 2;
				}
				if (cls.indexOf('colspan') > -1){
					cell_width = 2;
				}
								
                for(var n = 0;n < max_row;n++){					
					for(var m = 0;m < max_col;m++){						
						if(!self.hasFilled(blocks,cell_height,cell_width,n,m,max_col)){
							//console.log(n,m);		
											
							self.fillBlocks(blocks,cell_height,cell_width,n,m);
							DOM.css(item,{position:"absolute",top:n*w+'px',left:m*w+'px'});
							
							return;
						}					
					}					
				}				             
            })
        },
		
		hasFilled:function(blocks,h,w,row,col,max_col){			
			if( w+col > max_col){
				return true;
			}
			for(var i = 0;i<h;i++){
				for(var j = 0;j<w;j++){
					if(blocks[row+i][col+j]){
						return true;
					}
				}				
			}
			return false;
		},
		
		fillBlocks:function(blocks,h,w,n,m){
			for(var i = 0;i<h;i++){
				for(var j = 0;j<w;j++){
					blocks[n+i][m+j] = 1;
				}				
			}
		}
		
    };
    
	Resizer.init();
});
