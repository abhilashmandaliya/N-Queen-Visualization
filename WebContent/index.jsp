<%@page import="controller.json.simple.JSONObject"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<title>N-Queen Visualization</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
	integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	crossorigin="anonymous">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.17.0/vis.min.css">
<script src="https://code.jquery.com/jquery-3.1.1.min.js"
	integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
	crossorigin="anonymous"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
	integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
	crossorigin="anonymous"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.17.0/vis.min.js"></script>
<script src="js/nQueen.js"></script>
</head>
<body>
	<div class="container">
		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#home">Home</a></li>
			<li><a data-toggle="tab" href="#menu1">Play Game</a></li>
			<li><a data-toggle="tab" href="#menu2">Show Solution Tree</a></li>
			<li><a data-toggle="tab" href="#menu3">Show Solution Only</a></li>
		</ul>
		<div class="tab-content">
			<div id="home" class="tab-pane fade in active">
				<h3>
					<label>N-Queen Problem</label>
				</h3>
				<p>
					The <b>N Queens puzzle</b> is the problem of placing <b>N</b> chess
					queen on an <b>N x N</b> chessboard so that no two queens threaten
					each other. Thus, a solution requires that no two queens share the
					same row, column, or diagonal. In <b>N queens problem</b> there
					exist solution for all natural numbers <b>N</b> with the exception
					of <b>n=2</b> and <b>n=3</b>.
				</p>
				<div class="row">
					<div class="col-md-4">
						<a href="images/8x8.png" class="thumbnail">
							<p>8 Queen</p> <img src="images/8x8.png" alt="Pulpit Rock"
							style="width: 150px; height: 150px">
						</a>
					</div>
					<div class="col-md-4">
						<a href="images/9x9.png" class="thumbnail">
							<p>9 Queen</p> <img src="images/9x9.png"
							alt="Moustiers Sainte Marie" style="width: 150px; height: 150px">
						</a>
					</div>
					<div class="col-md-4">
						<a href="images/10x10.png" class="thumbnail">
							<p>10 Queen</p> <img src="images/10x10.png" alt="Cinque Terre"
							style="width: 150px; height: 150px">
						</a>
					</div>
				</div>
			</div>
			<div id="menu1" class="tab-pane fade">
				<h3>
					<form class="form-inline" role="form">
						<div class="form-group">
							<label>Enter Board Size</label> <input type="text"
								class="form-control" id="boardSize">
						</div>
						<button class="btn btn-success" id="drawBoard">Draw Board</button>
					</form>
				</h3>
				<div id="board"></div>
				<br />
				<div class="alert alert-info alert-dismissible">
					<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
					There are some known bugs in the UI
				</div>
			</div>
			<div id="menu2" class="tab-pane fade">
				<h3>
					<form class="form-inline">
						<div class="form-group">
							<label for="email">Solution Tree for N = </label> <input
								type="number" class="form-control" id="sizeTree">
						</div>
						<button type="button" class="btn btn-success"
							id="btnGetSolutionTree">Generate Tree</button>
					</form>
				</h3>
				<div class="alert alert-info alert-dismissible">
					<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
					Recommended Size is less than 8 unless server side rendering is
					applied !
				</div>
				<div id="mynetwork"
					style="width: 1200px; height: 455px; border: 1px solid lightgray;"></div>
			</div>
			<div id="menu3" class="tab-pane fade">
				<h3>
					<form class="form-inline">
						<div class="form-group">
							<label for="email">Solution List for N = </label> <input
								type="number" class="form-control" id="sizeList">
						</div>
						<button type="button" class="btn btn-success"
							id="btnGetSolutionList">Generate List</button>
					</form>
				</h3>
				<table class="table table-bordered" id="solutionTable">
					<thead>
						<tr>
							<th>Sr No.</th>
							<th>Position</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
		<br />
	</div>
</body>
</html>