<template>
  <div class="handleFileUpload" v-if="items.length === 0">
    <b-card title="Card Title" no-body>
        <b-card-header header-tag="nav">
          <b-nav card-header tabs>
            <b-nav-item active>Import file csv</b-nav-item>
            <b-nav-item type="button" id="btn-reset" @click="logout()"
              >Log out</b-nav-item
            >
          </b-nav>
        </b-card-header>
        <b-card-body class="text-center">
          <!-- <b-card-text>
            Import file csv.
          </b-card-text> -->
          <b-form-file
            ref="file-input"
            placeholder="เลือกไฟล์"
            v-on:change="handleFileUpload($event)"
            v-model="file"
            class="mt-3"
          >
          </b-form-file>
        </b-card-body>
      </b-card>
  </div>

  <div v-else>
    <div class="card mt-2">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div
              class="tab-detail product-tab"
              style="position: relative; height: calc(100%- 250px)"
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
                <template v-slot:cell(delete)="data">
                  <div @click="onDeleteItem(data.index)">
                    <i class="fa fa-times"></i>
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </div>
        <div class="row mt-12">
          <div >
            <button
              type="button"
              class="btn-style"
              id="btn-save"
              :disabled="disabledSave"
              @click="saveItems()"
            >
              SAVE
            </button>
            <button
              type="button"
              class="btn-style"
              id="btn-reset"
              :disabled="disabledSave"
              @click="saveImport()"
            >
              EXPORT CSV
            </button>
            <button
              type="button"
              class="btn-style"
              id="btn-reset"
              @click="resetItem()"
            >
              RESET
            </button>
            <button
              type="button"
              class="btn-style-2"
              id="btn-reset"
              @click="logout()"
            >
              LOG OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import books from "../router/helpers/service/books";
import Papa from "papaparse";
import importcsv from "../router/helpers/service/export";
export default {
  data() {
    return {
      csvFile: null,
      items: [],
      file: null,
      fields: [
        {
          key: "index",
          label: "ลำดับ",
          class: "text-center",
          sortable: true,
        },
        // id_user, user_name, department, license, installed, brand, serial
        
        {
          key: "username",
          label: "username",
          class: "text-center",
          sortable: true,
        },
        {
          key: "department",
          label: "Department",
          class: "text-center",
          sortable: true,
        },
        {
          key: "license",
          label: "license",
          class: "text-center",
          sortable: true,
        },
        {
          key: "Installed",
          label: "Installed",
          class: "text-center",
          sortable: true,
        },
        {
          key: "brand",
          label: "Brand",
          class: "text-center",
          sortable: true,
        },
        {
          key: "model",
          label: "model",
          class: "text-center",
          sortable: true,
        },
        {
          key: "serial",
          label: "serial",
          class: "text-center",
          sortable: true,
        },
        
        {
          key: "delete",
          label: "",
          sortable: true,
          class: "tr-delete",
        },
      ],
    };
  },

  // watch เช็คข้อมูลว่าง เปลี่ยนสีแดง
  watch: {
    items: {
      handler: function (val) {
        val.forEach((element, index) => {
          if (
            // id_user, user_name, department, license, installed, brand, serial
            
            element.username === "" ||
            element.department === "" ||
            element.license === "" ||
            element.Installed === "" ||
            element.brand === "" ||
            element.model === "" ||
            element.serial === "" 
            
          ) {
            element._rowVariant = "danger";
          } else if (element.serial !== null && element.serial !== "") {
            element._rowVariant = "success";
          } else {
            element._rowVariant = "";
          }
        });
      },
      deep: true,
    },
  },

  computed: {
    disabledSave: function () {
      return (
        this.items.filter(
          (e) =>
            // id_user, user_name, department, license, installed, brand, serial
            
            e.username === "" ||
            e.department === "" ||
            e.license === "" ||
            e.Installed === "" ||
            e.brand === "" ||
            e.model === "" ||
            e.serial === "" 
        ).length > 0
      );
    },
  },
  methods: {
    async onDeleteItem(index) {
      //onDeleteItem ลบ
      this.items.splice(index, 1);
      if (this.items.length === 0) {
        this.items = [];
      }
    },
    async saveImport() {
      //import ลงเครื่องเป็นไฟล์ csv
      await importcsv
        .getexporttocsv(this.items)
        .then((item) => {
          this.$utils.notificationConfirm("success", "โหลดข้อมูลเเล้ว", 0);
        })
        .catch((error) => {
          this.$utils.notificationConfirm("warning", "โหลดข้อมูลไม่สำเร็จ", 0);
        });
    },

    //เช็คว่าไฟล์เป็น csv ไหม
    handleFileUpload(event) {
      const file = event.target.files[0];
      var vm = this;
      if (file !== undefined) {
        var selectedFileSplit = file.name.split(".");
      }

      if (selectedFileSplit !== undefined) {
        var error = false;
        if (selectedFileSplit[1] !== "csv") {
          vm.$utils.notificationConfirm(
            "error",
            "Format ของ File csv ผิดรูปแบบ"
          );
          vm.$refs["file-input"].reset();
          vm.items = [];
          error = true;
        }
        if (!error) {
          Papa.parse(file, {
            header: true,
            complete: (results) => {
              const itemFilter = results.data.filter((item) => {
                //Id ไม่เท่ากับ null
                return item.id_user !== "";
              });
              // itemFilter.forEach((item) => {
              //   item.Price = parseInt(item.Price);
              // });
              this.items = itemFilter;
            },
          });
        }
      }
    },

    async saveItems() {
      if (this.items.length > 0) {
        let data = [];
        for (let i = 0; i < this.items.length; i++) {
          await books.postBooksIDProvider(this.items[i]).then(
            (result) => {
              data.push(result.data);
              // this.items.push(result.data);
            },
            (error) => {
              this.$utils.notificationConfirm("warning", "ข้อมูลมีเเล้ว", 0);
            }
          );
        }
        this.item = data;
        this.$utils.notificationConfirm("success", "เพิ่มเเล้วนะ", 0);
      }

      // async saveItems() {
      //   await books
      //     .postBooksIDProvider(this.items)
      //     .then((item) => {
      //       this.items = item.data;
      //       this.$utils.notificationConfirm("success", "เพิ่มเเล้วนะ", 0);
      //     })
      //     .catch((error) => {
      //       this.$utils.notificationConfirm("warning", "ข้อมูลมีเเล้ว", 0);
      //     });
    },
    logout() {
      window.location = "/login";
      localStorage.clear();
    },
    resetItem() {
      this.items = [];
    },
  },
};
</script>
<style>
.handleFileUpload {
  height: 200vh;
  width: 100%;
  /* display: flex; */
  justify-content: center;
  align-items: start;
}

.fa-times {
  width: 100%;
  text-align: center;
  color: #ff0000;
}

.btn-style{
  padding: 8px 26px;
  margin: 10px;
  background-color: #c5d6f6;
  border: none;
  color: #6988e7;
  border-radius: 8px;
  font-size:16px;
  
}
.btn-style:hover{
  background-color: #2b9cd5; 
  color: white;
}
.btn-style-2{
  padding: 8px 26px;
  margin: 10px;
  background-color: #F5E9EB;
  border: none;
  color: #F58B95;
  border-radius: 8px;
  font-size:16px;
}
.btn-style-2:hover{
  background-color: #F58B95; 
  color: white;
}

</style>
