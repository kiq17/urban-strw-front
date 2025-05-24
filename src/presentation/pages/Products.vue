<script setup lang="ts">
import { ProductModel } from "@/domain/models";
import { makeLocalStorageAdapter } from "@/main/factories/cache/localStorage.factory";
import { makeRemoteLoadProducts } from "@/main/factories/usecases/remoteLoadProducts.factory";
import { makeRemoteLoadProductsWithFilter } from "@/main/factories/usecases/remoteLoadProductsWithFilter.factory";
import Footer from "@/presentation/components/Footer.vue";
import Header from "@/presentation/components/Header.vue";
import FilterProduct from "@/presentation/components/ProductsComponents/FilterProduct.vue";
import ProductList from "@/presentation/components/ProductsComponents/ProductList.vue";
import { onMounted, onUnmounted, ref } from "vue";

interface Filter {
  value: string;
  active: boolean;
  type: "category" | "brand" | "order" | "name";
}

const productsParent = ref<ProductModel[]>([]);
const loadingParent = ref<boolean>(true);
const error = ref<string>("");
const nomeParent = ref<string>("");
const menu = ref<string>("close");
const countParent = ref<number>(0);
const findedParent = ref<number>(0);
const pageParent = ref<number>(1);

/* async function fomartQuery() {
  let query = "";
  let category: string[] = [];
  let order: string[] = [];
  let brand: string[] = [];

  for (let i of filters.value) {
    for (let [key, value] of Object.entries(i)) {
      console.log(value);

      if (value == "category") {
        category.push(i.value.toLowerCase());
      } else if (value == "order") {
        order.push(i.value.toLowerCase());
      } else if (value == "brand") {
        brand.push(i.value.toLowerCase());
      }
      // switch (value) {
      //   case value == "category":
      //   console.log("value")
      //     category.push(i.value);
      //     break;
      //   case value == "order":
      //     order.push(i.value);
      //     break;
      //   case value == "brand":
      //     brand.push(i.value);
      //     break;
      //   default:
      //     break;
      // }
    }
  }

  if (category.length > 0 && order.length > 0 && brand.length > 0) {
    query += `/products/?order=${order.join(",")}&category=${category.join(
      ","
    )}`;
  } else if (category.length > 0) {
    query += `/products/?category=${category.join(",")}`;
  }

  const res = await searchQuery(query);

  if (res instanceof AxiosError || res.products.length == 0) {
    error.value = "Erro ao carregar produtos";
    loading.value = false;
    products.value = [];
    return;
  }

  products.value = res.products;
  count.value = res.count;
  error.value = "";
  if (res.finded == undefined) {
    finded.value = ITENS_PER_PAGE;
    loading.value = false;
    return;
  }

  finded.value = res.finded;
  loading.value = false;
} */

function handleFilter(
  products: ProductModel[],
  finded: number,
  loading: boolean,
  count: number
) {
  loadingParent.value = loading;
  productsParent.value = products;
  findedParent.value = finded;
  countParent.value = count;
  console.log(count)
}

function handlePage(
  products: ProductModel[],
  finded: number,
  loading: boolean,
  count: number,
  page: number
) {
  loadingParent.value = loading;
  productsParent.value = products;
  findedParent.value = finded;
  countParent.value = count;
  pageParent.value = page;
}

function handleOrder(
  products: ProductModel[],
  finded: number,
  loading: boolean,
  count: number,
  page: number
) {
  loadingParent.value = loading;
  productsParent.value = products;
  findedParent.value = finded;
  countParent.value = count;
  pageParent.value = page;
}

function handleMenu(state: string) {
  menu.value = state;
}

onMounted(() => {
  window.addEventListener("resize", handleSizeChange);
  handleSizeChange();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleSizeChange);
});

function handleSizeChange() {
  if (window.innerWidth < 1000) {
    menu.value = menu.value;
  } else {
    menu.value = "close";
  }
}
</script>

<template>
  <Header :storage="makeLocalStorageAdapter()" />
  <section
    :data-state="menu"
    class="max-w-[1300px] max-lg:max-w-[360px] group grid relative grid-cols-min m-auto gap-10 mt-28 pb-10 max-lg:grid-cols-1"
  >
    <FilterProduct
      @menu-change="handleMenu"
      @products-change="handleFilter"
      :search-products="makeRemoteLoadProductsWithFilter()"
    />

    <ProductList
      :storage="makeLocalStorageAdapter()"
      :load-products="makeRemoteLoadProducts()"
      :search-products="makeRemoteLoadProductsWithFilter()"
      :nomeP="nomeParent"
      :productsP="productsParent"
      :loadingP="loadingParent"
      :findedP="findedParent"
      :countP="countParent"
      :pageP="pageParent"
      @menu-change="handleMenu"
      @page-change="handlePage"
      @order-change="handleOrder"
    />
  </section>
  <Footer />
  <DisclaimerBar />
</template>
