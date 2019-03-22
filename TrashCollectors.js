G.AddData({
name:'Trash Collectors',
author:'Eiim',
desc:'A simple mod that adds trash collection.',
engineVersion:1,
manifest:'0',
requires:['Default dataset*'],
sheets:{'gcSheet':'https://cdn.jsdelivr.net/gh/Eiim/LegacyTrashCollectors@master/GCSheet.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{
	
	new G.Unit({
		name:'garbage collector',
		desc:'@removes [spoiled food] and [muddy water]',
		icon:[0,0, 'gcSheet'],
		cost:{},
		use:{'worker':1},
		staff:{'stone tools':1},
		upkeep:{'coin':0.1},
		gizmos:true,
		modes:{
			'food removal':{name:'Remove spoiled food',icon:[3,7,3,7],desc:'Remove 100 [spoiled food].'},
			'water removal':{name:'Remove muddy water',icon:[8,6,8,6],desc:'Remove 100 [muddy water].'},
			'gem block removal':{name:'Remove gem blocks',icon:[18,8,18,8],desc:'Remove 100 [gem block]s',req:{G.getRes('gem block')["visible"]:true}}
		},
		effects:[
			{type:'convert',from:{'spoiled food':100},into:{'spoiled food':0},every:1,repeat:1,mode:'food removal'},
			{type:'convert',from:{'muddy water':100},into:{'muddy water':0},every:1,repeat:1,mode:'water removal'},
			{type:'convert',from:{'gem block':100},into:{'gem block':0},every:1,repeat:1,mode:'gem block removal'},
			{type:'mult',value: 2,req:{'cleanliness':true}}
		],
		req:{'garbage collection':true},
		category:'production',
	});
	
	new G.Tech({
		name:'garbage collection',
		desc:'@Your people learn that keeping rotten food around is suboptimal.',
		icon:[0,0,'gcSheet'],
		cost:{'insight':10},
		req:{'tool-making':true},
	});
	
	new G.Trait({
		name:'cleanliness',
		desc:'@[garbage collectors] clean trash twice as fast.',
		icon:[0,0,'gcSheet'],
		chance:10,
		req:{'garbage collection':true},
		effects:[],
	});

}
});