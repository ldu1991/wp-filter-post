<form id="filter" method="get">

    <!--<input type="text" name="price_min" placeholder="Min price" />
    <input type="text" name="price_max" placeholder="Max price" />-->
    <label>
        <input type="radio" name="date" value="ASC" /> Date: Ascending
    </label>  <br>
    <label>
        <input type="radio" name="date" value="DESC" /> Date: Descending
    </label>  <br>
    <?php $rooms = explode(",", $_GET['rooms']); ?>
    <label>1 <input type="checkbox" name="rooms" value="1" <?php if(in_array('1', $rooms)) echo 'checked="checked"'; ?> /></label>
    <label>2 <input type="checkbox" name="rooms" value="2" <?php if(in_array('2', $rooms)) echo 'checked="checked"'; ?> /></label>
    <label>3 <input type="checkbox" name="rooms" value="3" <?php if(in_array('3', $rooms)) echo 'checked="checked"'; ?> /></label>
    <label>4 <input type="checkbox" name="rooms" value="4" <?php if(in_array('4', $rooms)) echo 'checked="checked"'; ?> /></label>
    <br><br>
    <label>20<input type="checkbox" name="size" value="20" /></label>
    <label>21<input type="checkbox" name="size" value="21" /></label>
    <label>22<input type="checkbox" name="size" value="22" /></label>
    <label>23<input type="checkbox" name="size" value="23" /></label>    <br><br>

    <select name="city" multiple="multiple">
        <option value="zp">Запорожье</option>
        <option value="kiev">Киев</option>
        <option value="dnepr">Днепр</option>
    </select>      <br><br>


    <input type="reset" value="Сброс">
    <input type="submit" value="Фильтровать">

</form>
<div id="response"></div>
<div class="but"></div>
<div class="array"></div>
<div class="array2"></div>