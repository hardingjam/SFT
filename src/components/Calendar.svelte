<script>
    import {createEventDispatcher} from 'svelte';
    import {icons} from '../scripts/assets.js';

    export let value;
    export let minDate;
    export let maxDate;

    const dispatch = createEventDispatcher();

    let selectedDate = value ? new Date(value) : new Date();

    let showCalendar = false;

    function toggleCalendar() {
        showCalendar = !showCalendar;
    }

    function selectDate(date) {
        if (minDate && date < minDate) {
            selectedDate = minDate;
        } else if (maxDate && date > maxDate) {
            selectedDate = maxDate;
        } else {
            selectedDate = date;
        }

    }

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    let today = new Date();

    let currentYear = selectedDate.getFullYear();
    let currentMonth = selectedDate.getMonth();

    let daysInMonth = getDaysInMonth(currentYear, currentMonth);
    let firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

    let weeks = [];


    function renderWeek(month, year) {
        let dayCounter = 1;

        daysInMonth = getDaysInMonth(month, year);
        weeks = []
        for (let i = 0; i < 6; i++) {
            let week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    week.push(null);
                } else if (dayCounter > daysInMonth) {
                    week.push(null);
                } else {
                    let date = new Date(year, month, dayCounter);
                    week.push(date);
                    dayCounter++;
                }
            }
            weeks.push(week);
        }
    }


    renderWeek(currentMonth, currentYear);


    function prevMonth() {
        if (currentMonth === 0) {
            currentYear--;
            currentMonth = 11;
        } else {
            currentMonth--;
        }

        daysInMonth = getDaysInMonth(currentYear, currentMonth);
        firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

        updateSelectedDate();

        renderWeek(currentMonth, currentYear)
    }

    function nextMonth() {
        if (currentMonth === 11) {
            currentYear++;
            currentMonth = 0;
        } else {
            currentMonth++;
        }

        daysInMonth = getDaysInMonth(currentYear, currentMonth);
        firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

        updateSelectedDate();
        renderWeek(currentMonth, currentYear)

    }

    function updateSelectedDate() {
        if (selectedDate.getMonth() !== currentMonth || selectedDate.getFullYear() !== currentYear) {
            selectedDate = new Date(currentYear, currentMonth, selectedDate.getDate());
            dispatch('change', selectedDate);
        }
    }

    function okClick() {
        dispatch('change', selectedDate);
        showCalendar = false;
    }

    function getMonthName(monthNumber) {
        let months = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December",
        }

        return months[monthNumber]
    }
</script>

<div class="date-picker">
  <div class="input" on:click={toggleCalendar}>
    {#if selectedDate}
      {selectedDate.toLocaleDateString()}
    {:else}
      Select a date
    {/if}
  </div>

  {#if showCalendar}
    <div class="calendar">
      <div class="header">
        <div on:click={prevMonth}>
          <img src={icons.arrow_narrow_left} alt="prev">
        </div>
        <span>{getMonthName(currentMonth + 1)} {currentYear}</span>
        <div on:click={nextMonth}>
          <img src={icons.arrow_narrow_right} alt="next">
        </div>
      </div>

      <div class="days">
        <div class="day">Sun</div>
        <div class="day">Mon</div>
        <div class="day">Tue</div>
        <div class="day">Wed</div>
        <div class="day">Thu</div>
        <div class="day">Fri</div>
        <div class="day">Sat</div>
      </div>

      {#each weeks as week}
        <div class="week">
          {#each week as day}
            {#if day === null}
              <div class="empty"></div>
            {:else}
              <div
                class="date"
                class:selected={selectedDate.getTime() === day.getTime()}
                class:today={today.toDateString() === day.toDateString()}
                on:click={() => selectDate(day)}
              >
                {day.getDate()}
              </div>
            {/if}
          {/each}
        </div>
      {/each}
      <div class="buttons">
        <div class="ok-btn" on:click={()=>{okClick()}}>Ok</div>
        <div class="cancel-btn">Cancel</div>
      </div>
    </div>

  {/if}
</div>


<style>

    .date-picker {
        position: relative;
    }

    .calendar {
        position: absolute;
        bottom: 40px;
        display: inline-block;
        box-shadow: 0 1px 2px -1px rgba(0, 0, 0, 0.10), 0 1px 3px 0 rgba(0, 0, 0, 0.10);
        padding: 1rem;
        font-family: 'Inter', sans-serif;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%;
    }

    .header button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 20px;
    }

    .days {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        color: #6B7280;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;
    }

    .day {
        text-align: center;
        font-weight: bold;
    }

    .week {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%;
    }

    .date {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .date.selected {
        border-radius: 8px;
        border: 1px solid #AE6E00;
        color: #AE6E00;
    }

    .date.today {
        border-radius: 8px;
        border: 1px solid #1C64F2;
        background: #E1EFFE;
    }

    .empty {
        width: 36px;
        height: 36px;
    }

    .buttons {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
    }

    .ok-btn {
        border-radius: 8px;
        background: #AE6E00;
        text-align: center;
        color: #FFFFFF;
        padding: 12px 0;
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 37px;
    }

    .ok-btn:hover {
        cursor: pointer;
        background: #9d7334;
    }

    .cancel-btn {
        border-radius: 8px;
        border: 1px solid #AE6E00;
        color: #AE6E00;
        padding: 12px 0;
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 37px;

    }

    .cancel-btn:hover {
        background: #ececec;
        cursor: pointer;
    }
</style>
