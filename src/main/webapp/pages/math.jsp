<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Math the Cat</title>
    <link rel="stylesheet/less" type="text/css" href="${pageContext.request.contextPath}/styles.less" />
    <link id="contextPathHolder" data-contextPath="${pageContext.request.contextPath}"/>
    <meta http-equiv='content-type' content='text/html;charset=utf-8' />
    <script src="${pageContext.request.contextPath}/jquery-3.7.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/ts/less.js"></script>
    <script src="${pageContext.request.contextPath}/ts/validate-input.js" defer></script>
    <script src="${pageContext.request.contextPath}/ts/graphics.js" defer></script>

</head>
<body>
    <header>
        <div class="container">
            <%@ include file="../components/top-menu.jsp" %>
            <div class="page-cover bg-blue">
                <div class="side-page-title page-title">
                    <h1>Расчет попадания точки в график</h1>
                </div>
                <img src="${pageContext.request.contextPath}/assets/laptop_cat_full_width_low_res.jpg" alt="page-cover">
                <div class="image-shading"></div>
            </div>
        </div>
    </header>
    <div class="main math-page-layout">
        <div class="container">
            <form id="math-form" action="${pageContext.request.contextPath}/throw" class="control-side">
                <div class="btn-bar">
                    <h3 class="btn-title">
                        Тыкалки по R:
                    </h3>

                    <button value="1" type="button">1</button>
                    <button value="2" type="button">2</button>
                    <button value="3" type="button">3</button>
                    <button value="4" type="button">4</button>
                    <button value="5" type="button">5</button>
                    <input type="hidden" name="r" value="0" />

                </div>
                <div class="text-bar">
                    <label for="x">Нацарапай число:</label>
                    <input type="text" placeholder="X"
                        id="x" maxlength="6" name="x" data-range="3"/>

                    <label for="y">Нацарапай число:</label>
                    <input type="text" placeholder="Y"
                        id="y" maxlength="6" name="y" data-range="5"/>
                </div>
                <div class="submit-image">
                    <input type="image" src="${pageContext.request.contextPath}/assets/table_cat_colored.png"
                     alt="submit_table_cat">
                </div>
                <div class="recent-result">
                    <h3 class="result-title">Последний запрос:</h3>
                    <table class="result-table">
                        <%@ include file="../components/area-result.jsp"%>
                    </table>
                </div>
                <a class="show-history-btn" href="${pageContext.request.contextPath}/history">
                    Перейти к истории запросов
                </a>
            </form>
            <div class="graphics-side">
                <canvas id="math-area" width="2000" height="2000">Unsupported canvas view</canvas>
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