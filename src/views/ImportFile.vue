<template>
  <div v-if="items.length <= 0">
    <b-form-file
      ref="file-input"
      placeholder="เลือกไฟล์"
      accept=".xls, .xlsx"
      v-on:change="importExcel($event)"
      v-model="file"
    ></b-form-file>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <div class="card mt-2">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div
              class="tab-detail product-tab"
              style="position: relative; height: calc(100vh - 250px)"
            >
              <b-table
                class="table-report table-noborder table-hover-message table-hover-delete"
                :empty-text="'ไม่พบข้อมูล'"
                :show-empty="items.length == 0"
                :striped="true"
                :bordered="true"
                :items="items"
                :fields="fields"
              >
                <template v-slot:cell(index)="data">
                  <div class="text-center">
                    {{ data.index + 1 }}
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="importGG()">GG</button>
  </div>
</template>
<script>
import * as XLSX from "xlsx";
import books from "../router/helpers/service/books";
export default {
  data() {
    return {
      file: null,
      fields: [
        {
          key: "index",
          label: "ลำดับ",
          sortable: true,
        },
        {
          key: "Name",
          label: "name",
          class: "text-center",
          sortable: true,
        },
        {
          key: "Price",
          label: "Price",
          class: "text-center",
          sortable: true,
        },
        {
          key: "Category",
          label: "Category",
          class: "text-center",
          sortable: true,
        },
        {
          key: "Author",
          label: "Author",
          class: "text-center",
          sortable: true,
        },
      ],
      items: [],
      imports: null,
    };
  },
  mounted() {},
  methods: {
    logout() {
      window.location = "/login";
      localStorage.clear();
    },
    async importExcel(e) {
      var vm = this;
      var selectedFile = e.target.files[0];
      if (selectedFile !== undefined) {
        var selectedFileSplit = selectedFile.name.split(".");
      }
      var error = false;
      if (selectedFileSplit !== undefined) {
        if (selectedFileSplit[1] !== "xlsx") {
          vm.$utils.notificationConfirm(
            "error",
            "Format ของ File Excel ผิดรูปแบบ"
          );
          vm.file = null;
          vm.fileName = "";
          vm.$refs["file-input"].reset();
          vm.items = [];
          error = true;
          return false;
        }

        var reader = new FileReader();
        reader.onload = function (event) {
          var arr = [];
          var data = event.target.result;
          var workbook = XLSX.read(data, {
            type: "binary",
          });
          workbook.SheetNames.forEach(function (sheetName) {
            var row = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheetName]
            );

            var getHeader = XLSX.utils.sheet_to_json(
              workbook.Sheets[sheetName],
              {
                header: 1,
                defval: "",
              }
            );

            var headers = ["Id", "Name", "Price", "Category", "Author"];

            for (var key in getHeader[0]) {
              if (getHeader[0][key] !== headers[key]) {
                vm.$utils.notificationConfirm(
                  "error",
                  "Format ของ File Excel ผิดรูปแบบ"
                );
                vm.file = null;
                vm.fileName = "";
                vm.$refs["file-input"].reset();
                vm.items = [];
                error = true;
                return false;
              }
            }

            if (row.length > 0) {
              for (var i = 0; i < row.length; i++) {
                arr.push({
                  Name: row[i]["Name"],
                  Price: row[i]["Price"],
                  Category: row[i]["Category"],
                  Author: row[i]["Author"],
                });
              }
            } else {
              vm.$utils.notificationConfirm(
                "error",
                "ไม่สามารถนำข้อมูลเข้าระบบได้ รบกวนตรวจสอบข้อมูลใน File Excel"
              );
              vm.file = null;
              vm.fileName = "";
              vm.$refs["file-input"].reset();
              vm.items = [];
            }
          });

          if (!error) {
            vm.fileName = selectedFile.name;
            vm.onImportFile(arr);
          } else {
            vm.$utils.notificationConfirm(
              "error",
              "ไม่สามารถนำข้อมูลเข้าระบบได้ รบกวนตรวจสอบข้อมูลใน File Excel"
            );
            vm.file = null;
            vm.fileName = "";
            vm.$refs["file-input"].reset();
            vm.items = [];
          }
        };
        reader.onerror = function (event) {
          if (event.target.error.name === "NotReadableError") {
            vm.file = null;
            vm.fileName = "";
            vm.$refs["file-input"].reset();
          }
        };
        reader.readAsBinaryString(selectedFile);
      }
    },
    onImportFile(fileItems) {
      const gg = fileItems.find((item) => {
        return item.Price === 3;
      });
      books
        .postBooksIDProvider(gg)
        .then((item) => {
          this.items.push(item.data);
          this.imports = item.data;
          this.$utils.notificationConfirm("success", "เพิ่มเเล้วนะ", 0);
        })
        .catch((error) => {
          this.$utils.notificationConfirm("warning", "ข้อมูลมีเเล้ว", 0);
        });
    },
    importGG() {
      let data = [];
      data.push({
        Id: this.imports.Id,
        Name: this.imports.Name,
        Price: this.imports.Price,
        Category: this.imports.Category,
        Author: this.imports.Author,
      });
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws);
      XLSX.writeFile(wb, `"GGGG".xlsx`);
    },
  },
};
</script>
