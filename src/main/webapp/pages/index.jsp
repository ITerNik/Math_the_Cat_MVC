<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Math the Cat</title>
	<link rel="stylesheet/less" type="text/css" href="${pageContext.request.contextPath}/static/styles.less" />
	<meta http-equiv='content-type' content='text/html;charset=utf-8' />
	<script src="${pageContext.request.contextPath}/static/ts/less.js" type="text/javascript"></script>
</head>
<body>
<header>
	<div class="container">
		<%@ include file="../components/top-menu.jsp" %>
		<div class="page-cover bg-blue">
			<div class="page-title">
				<h1>Math the Cat</h1>
				<hr />
				<h2>Добро пожаловать!</h2>
				<em>Вы умножаете рыбов?</em>
			</div>
			<img src="${pageContext.request.contextPath}/static/assets/laptop_cat_full_width_low_res.jpg" alt="page-cover">
			<div class="image-shading" />
		</div>
	</div>
</header>
<div class="main bg-white">
	<div class="container card-layout">
		<div class="card-item">
			<a href="${pageContext.request.contextPath}/math" class="card-link"></a>
			<img src="${pageContext.request.contextPath}/static/assets/book_coffee_cat_low_res.jpg"
				 alt="book_coffee_cat" class="card-cover">
			<div class="text-wrapper">
				<h2 class="card-title">Расчет попадания точки в график v1.0</h2>
				<div class="details-wrapper">
					<p class="card-description">Определить принадлежность точки заданной области по ее координатам. <br /> С использованием базового HTML, CSS и JS</p>
				</div>
			</div>
		</div>
		<div class="card-item">
			<a href="${pageContext.request.contextPath}/math" class="card-link"></a>
			<img src="${pageContext.request.contextPath}/static/assets/laptop_cat_low_res.jpg"
				 alt="laptop_cat" class="card-cover">
			<div class="text-wrapper">
				<h2 class="card-title">Расчет попадания точки в график v2.0</h2>
				<div class="details-wrapper">
					<p class="card-description">Определить принадлежность точки заданной области по ее координатам. <br /> Улучшенная версия с добавлением JSP и Canvas</p>
				</div>
			</div>
		</div>
		<div class="card-item">
			<a href="#" class="card-link"></a>
			<img src="${pageContext.request.contextPath}/static/assets/sleeping_cat_low_res.jpg"
				 alt="sleeping_cat" class="card-cover">
			<div class="text-wrapper">
				<h2 class="card-title">Котьки усиленно трудятся над новинками</h2>
				<div class="details-wrapper">
					<p class="card-description">Когда-нибудь здесь что-то появится...</p>
				</div>
			</div>
		</div>
	</div>
</div>
<footer class="bg-dark">
	<div class="container">
		<div class="license">
			<h2>Math the Cat</h2>
			© 2023 Терехин Никита | Все права защищены
		</div>
	</div>
</footer>
</body>
</html>