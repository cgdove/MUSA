/*
THE CODE IN THIS FILE IS DEPRECATED AND NOT RELEVANT TO THE PRESENT WORKING STATE OF THE VISUALISATION
*/

var extentKeyword = [];

function createTreeData(data)
{
	var nestedBySymbol = nestBySymbol_tree(data);
	var globalCounts = [];
	
	nestedBySymbol.forEach(function(d){
			var fullData = nestByNameAndParent_shorten(d.values);
			//console.log(fullData);
			var treeData = applyTreeStructure(fullData);
			treeData.forEach(function(e){
				globalCounts.push(e.count);
			})
			//console.log(treeData);
			treeObj[d.key] = treeData;
	});
	
	extentKeyword = d3.extent(globalCounts, function(d){
						return d;
					})
}

function nestByNameAndParent_shorten(data)
{
	var uni = d3.nest()
		.key(function(d){
			return d.name;
		})
		.key(function(d){
			return d.parent;
		})
		.entries(data);


	var short = [];
	
	uni.forEach(function(name){
		name.values.forEach(function(parent){
			
			var nestByStories = d3.nest()
			.key(function(d){
				return d.story_id;
			})
			.entries(parent.values);
			
		short.push({"name": name.key, "parent": parent.key, "count": nestByStories.length, "id": parent.values[0].id, "text": parent.values[0].text});
		})
	})
	
	return short;
}

function applyTreeStructure(data)
{
	var dataMap = mapData(data);
	//console.log(dataMap);
	
	var treeData = [];
	data.forEach(function(node) {
		var parent = dataMap[node.parent];
		//console.log(parent);
		if (parent) {

			(parent.children || (parent.children = []))
			//add node to child array
			.push(node);
			//console.log(parent);
		} else {
			// parent is null or missing
			//console.log(node);
			var i = treeData.indexOf(node);
			//console.log(i);
			treeData.push(node);
		}
	});
	
	return treeData;

}

function mapData(data){

	var dataMap = data.reduce(function(map, node) {
		 //console.log(map);
		 //console.log(name);
		 map[node.name] = node;
		 return map;
		}, {});
	
	var test = JSON.parse(JSON.stringify(dataMap));
	//console.log(test);
	return dataMap;
}

function nestBySymbol_tree(data)
{
	var n = d3.nest()
				.key(function(d){
					return d.symbol_id;
				})
				.entries(data);

	return n;
}