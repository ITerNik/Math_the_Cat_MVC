<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<html>
<head>
    <title>Math the Cat</title>
    <link rel="stylesheet" href="style.css">
    <script src="graphics.js" defer></script>
    <script src="validation.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <table class="frame_table">
        <thead class="background_image side_page">
            <tr>
                <ul class="nav_panel background_black">
                    <li>
                        <a href="index.html">Math the Cat</a>
                    </li>
                    <li>
                        <a href="history.jsp">История</a>
                    </li>
                    <li>
                        <a href="contact.html">Контакты</a>
                    </li>
                    <li>
                        <a href="index.html">Главная</a>
                    </li>
                </ul>
            </tr>
            <tr>
                <td colspan="6" class="header">
                    <h1>Рассчитать попадание точки в график</h1>
                </td>
            </tr>
        </thead>
        <tbody>
            <tr class="margin_raw">
                <td colspan="5"></td>
                <td id="col_5" rowspan="8">
                    <canvas width="550" height="550" id="graphics">
                        <img src="img/function.jpg" alt="function_graph">
                    </canvas>
                </td>
            </tr>

            <form action="/throw" method="GET" id="input_form">
                <tr>
                    <td id="col_0"></td>
                    <td colspan="3" class="pointer">
                        <p class="valid-warn hide" id="invalid-x">0</p>
                        <div>Тыкалки по R:</div>
                    </td>
                    <td id="col_4" rowspan="2" class="text_bar">
                        <input type="text" id="y_coordinate" name="y_coordinate" placeholder="Нацарапайте Y" data-min="-3" data-max="3">
                        <p class="valid-warn hide" id="invalid-y">0</p>
                        <input type="text" id="r_coordinate" name="r_coordinate" placeholder="Нацарапайте X" data-min="1" data-max="4">
                        <p class="valid-warn hide" id="invalid-r">0</p>
                    </td>
                </tr>
                <tr class="radio_bar">
                    <td></td>
                    <td id="col_1">
                        <input type="radio" id="x_coordinate1" name="x_coordinate" value="1">
                        <label for="x_coordinate1">1</label>
                    </td>
                    <td id="col_2">
                        <input type="radio" id="x_coordinate2" name="x_coordinate" value="2">
                        <label for="x_coordinate2">2</label>
                    </td>
                    <td id="col_3">
                        <input type="radio" id="x_coordinate3" name="x_coordinate" value="3">
                        <label for="x_coordinate3">3</label>
                    </td>
                </tr>
                <tr class="radio_bar">
                    <td></td>
                    <td>
                        <input type="radio" id="x_coordinate4" name="x_coordinate" value="4">
                        <label for="x_coordinate4">4</label>
                    </td>
                    <td>
                        <input type="radio" id="x_coordinate5" name="x_coordinate" value="5">
                        <label for="x_coordinate5">5</label>
                    </td>
                    <td>
                        <input type="radio" id="x_coordinate6" name="x_coordinate" value="6">
                        <label for="x_coordinate6">6</label>
                    </td>
                    <td>
                        <input type="submit" class="btn" id="submit-btn" value="Рассчитать">
                    </td>
                </tr>
                <tr class="radio_bar"></tr>
            </form>
            <tr class="margin_raw">
                <td></td>
                <td colspan="4">
                    <div class="recent_result">
                        <h2>Последний запрос:</h2>
                        <table id="result-table">
                            <jsp:include page="area-result.jsp" />
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td></td>
                <td colspan="4">
                    <a href="/history.jsp" class="btn">
                        Перейти к истории запросов
                    </a>
                </td>
            </tr>
            <tr class="margin_raw"></tr>
        </tbody>
        <tfoot class="footer">
            <tr>
                <td colspan="6">© 2023 Терехин Никита | Все права защищены</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>