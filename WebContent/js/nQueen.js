$(document)
		.ready(
				function() {
					$('#drawBoard')
							.click(
									function() {
										var board = "";
										var size = parseInt($("#boardSize")
												.val());
										for (i = 0; i < size; i++) {
											board += '<div class="btn-group-horizontal" >';
											for (j = 0; j < size; j++)
												board += '<button type="button" count=0 class="btn btn-default" id="rc'
														+ i
														+ '~'
														+ j
														+ '">.</button>';
											board += '</div>';
										}
										$('#board').html(board);
										return false;
									});
					function enableDisableLocation(val, id) {
						var btnClass;
						if (val)
							btnClass = "btn btn-danger";
						else
							btnClass = "btn btn-default";
						var index = id.indexOf('~');
						var row = id.substr(0, index);
						var col = id.substr(index + 1);
						var tempRow = row, tempCol = col;
						var size = parseInt($("#boardSize").val());
						for (i = 0; i < size; i++) {
							document.getElementById('rc' + row + '~' + i).className = btnClass;
							document.getElementById('rc' + i + '~' + col).className = btnClass;
							document.getElementById('rc' + row + '~' + i).disabled = val;
							document.getElementById('rc' + i + '~' + col).disabled = val;
						}
						while (tempRow > 0 && tempCol > 0) {
							document.getElementById('rc' + (--tempRow) + '~'
									+ (--tempCol)).className = btnClass;
							document.getElementById('rc' + (tempRow + 1) + '~'
									+ (tempCol + 1)).disabled = val;
						}
						document.getElementById('rc' + (tempRow) + '~'
								+ (tempCol)).disabled = val;
						tempRow = row;
						tempCol = col;
						while (tempCol < size - 1 && tempRow < size - 1) {
							document.getElementById('rc' + (++tempRow) + '~'
									+ (++tempCol)).className = btnClass;
							document.getElementById('rc' + (tempRow - 1) + '~'
									+ (tempCol - 1)).disabled = val;
						}
						document.getElementById('rc' + (tempRow) + '~'
								+ (tempCol)).disabled = val;
						tempRow = row;
						tempCol = col;
						while (tempCol > 0 && tempRow < size - 1) {
							document.getElementById('rc' + (++tempRow) + '~'
									+ (--tempCol)).className = btnClass;
							document.getElementById('rc' + (tempRow - 1) + '~'
									+ (tempCol + 1)).disabled = val;
						}
						document.getElementById('rc' + (tempRow) + '~'
								+ (tempCol)).disabled = val;
						tempRow = row;
						tempCol = col;
						while (tempCol < size - 1 && tempRow > 0) {
							document.getElementById('rc' + (--tempRow) + '~'
									+ (++tempCol)).className = btnClass;
							document.getElementById('rc' + (tempRow + 1) + '~'
									+ (tempCol - 1)).disabled = val;
						}
						document.getElementById('rc' + (tempRow) + '~'
								+ (tempCol)).disabled = val;

						document.getElementById('rc' + (row) + '~' + (col)).disabled = false;
						if (val)
							document.getElementById('rc' + row + '~' + col).className = "btn btn-info";
						else
							document.getElementById('rc' + row + '~' + col).className = "btn btn-default";
					}
					$(document).on('click', '[id^=rc]', function() {
						var id = $(this).attr('id').substr(2);
						var isEnabled = $(this).hasClass('btn-info');
						if (isEnabled)
							enableDisableLocation(false, id);
						else
							enableDisableLocation(true, id);
					});
					var network = null;
					var layoutMethod = "directed";
					function destroy() {
						if (network !== null) {
							network.destroy();
							network = null;
						}
					}
					function draw(data, links) {
						destroy();
						var nodes = [];
						var edges = [];
						for (var i = 0; i < Object.keys(data).length; i++) {
							var temp = data[i].split(":");
							if (temp[1] == $("#sizeTree").val() - 1) {
								nodes.push({
									id : i,
									label : temp[0],
									color : {
										background : '#5cb85c',
										border : 'purple'
									}
								});
							} else {
								nodes.push({
									id : i,
									label : temp[0],
								});
							}
						}
						for (var i = 0; i < Object.keys(links).length; i++) {
							var temp = links[i].split(":");
							edges.push({
								from : parseInt(temp[0]),
								to : parseInt(temp[1])
							});
						}
						var container = document.getElementById('mynetwork');
						var treeData = {
							nodes : nodes,
							edges : edges
						};
						console.log(treeData);
						var options = {
							layout : {
								hierarchical : {
									sortMethod : layoutMethod
								}
							},
							edges : {
								smooth : true,
								arrows : {
									to : true
								}
							}
						};
						network = new vis.Network(container, treeData, options);
					}
					$("#btnGetSolutionTree,#btnGetSolutionList")
							.click(
									function() {
										var val;
										var sizeEle;
										if ($(this).attr('id') == "btnGetSolutionList") {
											val = false;
											sizeEle = "sizeList";
										} else {
											val = true;
											sizeEle = "sizeTree";
										}
										$
												.ajax({
													url : "SolutionServlet",
													type : "post",
													data : {
														"size" : $(
																"#" + sizeEle)
																.val(),
														"allNodes" : val
													},
													success : function(data) {
														if (val) {
															data = data
																	.split("*");
															data[0] = JSON
																	.parse(data[0]);
															data[1] = JSON
																	.parse(data[1]);
															draw(data[0],
																	data[1]);
														} else {
															$('#solutionTable')
																	.find(
																			"tr:gt(0)")
																	.remove();
															data = JSON
																	.parse(data);
															for (var i = 0; i < Object
																	.keys(data).length; i++) {
																$(
																		'#solutionTable tr:last')
																		.after(
																				"<tr><td>"
																						+ (i + 1)
																						+ "</td><td>"
																						+ (data[i])
																						+ "</td></tr>");
															}
														}
													}
												});
									});
				});