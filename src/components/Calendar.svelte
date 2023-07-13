<script>
    import {createEventDispatcher} from 'svelte';

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

        dispatch('change', selectedDate);
        showCalendar = false;
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

    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
        let week = [];
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfMonth) {
                week.push(null);
            } else if (dayCounter > daysInMonth) {
                week.push(null);
            } else {
                let date = new Date(currentYear, currentMonth, dayCounter);
                week.push(date);
                dayCounter++;
            }
        }
        weeks.push(week);
    }

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
    }

    function updateSelectedDate() {
        if (selectedDate.getMonth() !== currentMonth || selectedDate.getFullYear() !== currentYear) {
            selectedDate = new Date(currentYear, currentMonth, selectedDate.getDate());
            dispatch('change', selectedDate);
        }
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
      <div class="calendar">
        <div class="header">
          <div on:click={prevMonth}>&lt;</div>
          <span>{currentYear} - {currentMonth + 1}</span>
          <div on:click={nextMonth}>&gt;</div>
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
        justify-content: center;
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
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .date.selected {
        background-color: #ccc;
    }

    .date.today {
        font-weight: bold;
        color: blue;
    }

    .empty {
        width: 30px;
        height: 30px;
    }
</style>
