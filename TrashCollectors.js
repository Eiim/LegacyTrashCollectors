G.AddData({
name:'Trash Collectors',
author:'Eiim',
desc:'A simple mod that adds trash collection.',
engineVersion:1,
manifest:'0',
requires:['Default dataset*'],
sheets:{'tcSheet':'https://cdn.jsdelivr.net/gh/Eiim/LegacyTrashCollectors@master/TCSheet.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{
	
	new G.Unit({
		name:'trash collector',
		desc:'@removes [spoiled food] and [muddy water]',
		icon:[0,0, 'tcSheet'],
		cost:{},
		use:{'worker':1},
		staff:{'stone tools':1},
		upkeep:{'coin':0.1},
		gizmos:true,
		modes:{
			'food removal':{name:'Remove spoiled food',icon:[3,7,3,7],desc:'Remove 100 [spoiled food].'},
			'water removal':{name:'Remove muddy water',icon:[8,6,8,6],desc:'Remove 100 [muddy water].'}
		},
		effects:[
			{type:'convert',from:{'spoiled food':100},into:{'spoiled food':0},every:1,repeat:1,mode:'food removal'},
			{type:'convert',from:{'muddy water':100},into:{'muddy water':0},every:1,repeat:1,mode:'water removal'},
			{type:'mult',value: 2,req:{'cleanliness':true}}
		],
		req:{'trash collection':true},
		category:'production',
	});
	
	new G.Tech({
		name:'trash collection',
		desc:'@Your people learn that keeping rotten food around is suboptimal.',
		icon:[0,0,'tcSheet'],
		cost:{'insight':5},
		req:{'tool-making':true},
	});
	
	new G.Trait({
		name:'cleanliness',
		desc:'@[trash collectors] clean trash twice as fast.',
		icon:[0,0,'tcSheet'],
		chance:10,
		req:{'trash collection':true},
		effects:[],
	});

}
});