var Mock = require('mockjs');
exports.default = Mock.mock(/\/test\/mockData/, function(options){
	var template = {};
	if(options.url.indexOf("indexSection") != "-1"){/*首页*/
		template = {
		    "analystArray|3": [
		    {
		      "arrayGroup|3": [
			      {
			      	"id|+1": 1,
				    "name":'@ctitle(2, 4)',
				    "img":'@image("94x94", @color, @name)',
					"view|1-100": 50,
					"votes|1-100": 100
			      }
		          
		      ]
		      
		    }
		  ],
		  "news|8": [
		    {
		      "id|+1": 1,
		      "title":'@ctitle(2, 4)',
		      "title|1": [
			    "精华",
			    "超赞"
			  ],
			  "message":'@cparagraph(1, 3)'
		    }
		  ],
		};
	}else if(options.url.indexOf("articleDetail") != "-1"){/*新闻详情*/
		template = {
			"article" :{
				'title': '@ctitle(6, 20)',
		    	"time|1-30": 30,
		    	"author":'@ctitle(4, 10)',
		    	"content":"@cparagraph(30,50)",
		    	
			}	
		};
	}else if(options.url.indexOf("AnalystInfo") != "-1"){/*分析师介绍页*/
		template = {
			"analystInfo" :{
				'message': '@cparagraph(6, 10)',
		    	"img":'@image("110x110", @color, @name)',
		    	"qq|1":/\d{5,11}/,
		    	"weixin|1":/[a-z][A-Z][0-9]{5,11}/,
		    	"email|1":"@email",
		    	"phone|1":/\d{11}/
			},
			"analystNews|3-6": [
			      {
			      	"id|+1": 1,
				     'message': '@cparagraph',
				     "img":'@image("75x75", @color, @name)',
					 "data|1-30": 30
			      }
		          
		      ]
		    
		};
	}else if(options.url.indexOf("IntroduceCom") != "-1"){/*公司介绍页面*/
		template = {
			"comSummarize" :{
				'name': '@ctitle(5, 10)',
		    	"img":'@image("75x72", @color, @name)',
		    	"score|100-1000":1000,
		    	"comment|1-100":100,
		    	"view|100-1000":1000,
		    	"introduce":'@cparagraph',
		    	"pic":'@image("300x130", @color, @name)',
		    	"certificate|3":[
		    		'@image("87x62", @color, @name)'
		    	],
		    	"country":'@ctitle(2, 5)',
	    		"time":"@date('yyyy')",
	    		"organization":'@string("upper", 3, 6)',
	    		"model":'@ctitle(6, 10)',
	    		"software":'@ctitle(2, 5)',
	    		"method":'@ctitle(6, 10)',
	    		"discount":'@ctitle(6, 10)',
	    		"money|200-1000":1000,
		    	"contacts|3":[
		    		{
		    			"name":'@ctitle(2, 5)',
		    			"introduce":'@ctitle(8, 12)',
		    			"img":'@image("110x110", @color, @name)',
				    	"weixin|1":/[a-z][A-Z][0-9]{5,11}/,
				    	"email|1":"@email",
				    	"phone|1":/\d{11}/
		    		}
		    	],
		    	"stars|1-5":5,
		    	"service|1-100":100
			},
			"evaluateList|4": [
				{
					"number|1-5":5,
					"message|1-2":[
						{
							"name":'@ctitle(2, 5)',
							"stars|1-5":5,
							"img":'@image("45x45", @color, @name)',
							"data|1-30":30,
			    			"introduce":'@cparagraph(6, 10)',
					    	"pics|3":[
					    		'@image("77x55", @color, @name)'
					    	],
						}
					]
				}
			] 
		    
		};
	}else if(options.url.indexOf("analystVote") != "-1"){/*分析师投票页面*/
		console.log(options.url);
		var currencePage = options.url.substr(options.url.indexOf("&page=") + 6,1);
		if(currencePage < 5){
			if(currencePage == 1){
				template = {
					"analystVoteInfo": {
			      	"voteTime":'@date',
			      	"prizeTime":'@date',
			      	"prizePlace":'@ctitle(4, 8)',
			      	"signupNumber|1-2000": 2000,
			      	"voteNumber|1-2000": 2000,
			      	"visitNumber|1-2000": 2000
			      },
			      "analystVoteArray|6": [
				    {
				      "id|+1": 1,
				      "name":'@ctitle(2, 4)',
				      "img":'@image("94x94", @color, @name)',
					  "votes|1-1000": 100
				    }
				  ]
		    	};
			}else{
				template = {
				    "analystVoteArray|6": [
			    	{
				      "id|+1": 1,
				      "name":'@ctitle(2, 4)',
				      "img":'@image("94x94", @color, @name)',
					  "votes|1-1000": 100
				    }
				  ]
			};
			}
			
		}else{
			template = {
			    "analystVoteArray|0": []
			};
		}
		
	}else if(options.url.indexOf("searchName") != "-1"){/*首页搜索公司和人名*/
		console.log(options.url);
		var value = options.url.substr(options.url.indexOf("&name=") + 6);
		console.log(value);
		template = {
	      "type|1": [
		    "企业",
		    "分析师"
		  ],
		  "value":value
	    }
	}else if(options.url.indexOf("CompanyVote") != "-1"){/*企业投票页面*/
		console.log(options.url);
		template = {
	      "companyVoteInfo": {
	      	"voteTime":'@date',
	      	"prizeTime":'@date',
	      	"prizePlace":'@ctitle(4, 8)',
	      	"signupNumber|1-2000": 2000,
	      	"voteNumber|1-2000": 2000,
	      	"visitNumber|1-2000": 2000
	      },
		  "companyListArray|4":
		  	{
		  		"voteLargest|3-6":[
		  			{
		  				"id|+1": 1,
		  				"title":'@ctitle(6, 10)',
		  				"type|1": [
						    "1",
						    "2"
						],
						"score|1-3000": 3000,
					    "percent|1-100": 100,
					    "img":'@image("91x86", @color, @name)',
						"view|1-10000": 10000,
						"evaluate|1-1000": 100,
				  		"starts|1-5": 5
		  			}
		  		],
		  		"commentLargest|0-3":[
		  			{
		  				"id|+1": 1,
		  				"title":'@ctitle(6, 10)',
		  				"type|1": [
						    "1",
						    "2"
						],
						"score|1-3000": 3000,
					    "percent|1-100": 100,
					    "img":'@image("91x86", @color, @name)',
						"view|1-10000": 10000,
						"evaluate|1-1000": 100,
				  		"starts|1-5": 5
		  			}
		  		],
		  		"newest|0-3":[
		  			{
		  				"id|+1": 1,
		  				"title":'@ctitle(6, 10)',
		  				"type|1": [
						    "1",
						    "2"
						],
						"score|1-3000": 3000,
					    "percent|1-100": 100,
					    "img":'@image("91x86", @color, @name)',
						"view|1-10000": 10000,
						"evaluate|1-1000": 100,
				  		"starts|1-5": 5
		  			}
		  		],
		  		"authentication|0-3":[
		  			{
		  				"id|+1": 1,
		  				"title":'@ctitle(6, 10)',
		  				"type|1": [
						    "1",
						    "2"
						],
						"score|1-3000": 3000,
					    "percent|1-100": 100,
					    "img":'@image("91x86", @color, @name)',
						"view|1-10000": 10000,
						"evaluate|1-1000": 100,
				  		"starts|1-5": 5
		  			}
		  		]
		  	}
		  
	    }
	}
	return Mock.mock(template);
});