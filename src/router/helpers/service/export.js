
const exporttocsv = {
    async getexporttocsv(items) {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += 'username, department, license, Installed, brand, model, serial\n'; // ข้อมูลหัวข้อคอลัมน์
        items.forEach((row) => {
            const rowData = Object.values(row).join(',');
            csvContent += `${rowData}\n`;
        });

        // สร้างลิงก์ดาวน์โหลด CSV
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return items
    }
}

export default exporttocsv