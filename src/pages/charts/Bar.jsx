import Chart from "chart.js";

const barchart = () => {

    const chart = new Chart(
        document.getElementById('myChart')
    )

    return (
        <>
        <span id="myChart"></span>
        </>
    )
}
export default barchart