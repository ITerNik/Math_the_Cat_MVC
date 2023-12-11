<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Math the Cat</title>
    <link rel="stylesheet/less" type="text/css" href="../styles.less" />
    <meta http-equiv='content-type' content='text/html;charset=utf-8' />
    <script src="../ts/less.js" type="text/javascript"></script>
</head>
<body>
    <header>
        <div class="container">
            <%@ include file="../components/top-menu.jsp" %>
            <div class="page-cover bg-blue">
                <div class="side-page-title page-title">
                    <h1>Расчет попадания точки в график</h1>
                </div>
                <img src="../assets/laptop_cat_full_width_low_res.jpg" alt="page-cover">
                <div class="image-shading" />
            </div>
        </div>
    </header>
    <div class="main math-page-layout">
        <div class="container">
            <form action="${pageContext.request.contextPath}/history" method="get"
                  class="control-side">
                <div class="btn-bar">
                    <h3 class="btn-title">
                        Тыкалки по R
                    </h3>

                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>

                    <div class="error"></div>
                </div>
                <div class="text-bar">
                    <label for="x">Нацарапай число:</label>
                    <input type="text" placeholder="X"
                        id="x" maxlength="1" />
                    <div class="error"></div>

                    <label for="y">Нацарапай число:</label>
                    <input type="text" placeholder="Y"
                        id="y" maxlength="1" />
                    <div class="error"></div>
                </div>
                <div class="submit-image">
                    <input type="image" src="../assets/table_cat_colored.png"
                     alt="submit_table_cat">
                </div>
                <div class="recent-result">
                    <h3 class="result-title">Последний запрос:</h3>
                    <table class="result-table">
                        <td>
                            <em>Здесь пока ничего нет</em>
                        </td>
                    </table>
                </div>
                <a class="show-history-btn" href="${pageContext.request.contextPath}/history">
                    Перейти к истории запросов
                </a>
            </form>
            <div class="graphics-side">
                <canvas id="math-area">
                    <img src="../assets/sleeping_cat_low_res.jpg" alt="unavailable_plugin" />
                </canvas>
                <script>
                    const area = document.querySelector('#math-area');
                    const ctx = area.getContext('2d');
                    ctx.fillStyle = '#219EBC';
                    ctx.fillRect(0, 0, area.width, area.height);
                </script>
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