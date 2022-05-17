import React, { Component } from 'react';
import firebase from './firebase.js';
import moment, { monthsShort } from 'moment';
const ProductContext = React.createContext();
class ProductProvider extends Component {
    state = {
        products: [], 
        cart:[],
        cartTotal: 0,
        modalOpen:false,
        modalOpen2:false,
        modalOpen3:false,
        modalOpen4:false,
        image: null,
        url: '',
        input: [],
        inputPrice: [],
        inputQuantity: [],
        inputDescription:[],
        order:0,
        checks:[],
        descriptionItems:'',
        dayTotal: 0,
        startDate : new Date(),
        filteredDate : [],
        showingProducts:[],
        category:'',
        options: [],
        deleting:'',
        categories:[],
        categoryId: null,
        user:null,
        email: '',
        password: '',
        greeting:'',
    };
    //One dimensional array for categories of products
    category = ['Пиццы', 'Напитки', 'Комбо'];
    //checking for administrators id
    //binary search for orders
    search=(array, element,compare)=>{
        var a =0;
        var b = array.length-1;
        while (a<=b){
            var c = (a+b) >> 1;
            var comp = compare(element,array[c]);
            if (comp>0){
                a=c+1;
            } else if (comp<0){
                b=c-1;
            } else {
                return c
            }
        }
    }
    componentDidMount(){
        this.authListener();
        this.setProducts();
        this.getCart();
        this.switchActive();
        this.setTotal();
        this.setChecks();
        this.checktotal();
        this.uploadCategory();
        this.setCategoryId();
    }
    authListener=() => {        //creating authorization function using firebase API
        firebase.auth().onAuthStateChanged((user) => { 
          console.log(user);
          if (user) {
            this.setState({ user });        //if user exists it creates user state
            localStorage.setItem('user', user.uid);
            user ?  document.getElementById('navbar').style.display="flex" : document.getElementById('navbar').style.display="none";
          } else {
            this.setState({ user: null });  //if there is no user the state is null
            localStorage.removeItem('user');
          }
        });
      }
      login = (e) =>{   //log in function using firebase API
        e.preventDefault(); //page is not reloaded
        let greeting = "Hello, " + this.state.email + "!";
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{ //firebase API checks entered email and pass, then logs users in
        }).catch((error) => {
            alert(error.message)        //showing error message
          });
        console.log(greeting);
        this.setState(() => {
            return {
                greeting: greeting
            };
        })
        //this.setState({ greeting : "Hello, " + this.state.email + "!" });
        console.log(this.state.greeting);
      }
    
      signup= (e) =>{        //sign up function using firebase API
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{ //firebase API creates users with email and password
        }).then((u)=>{console.log(u)})
        .catch((error) => {
            alert(error.message)
          })
      }

      logout =() => {    //log out function using firebase API
        firebase.auth().signOut(); //firebase API log outs users
        window.location.href = window.location.origin;
        document.getElementById('navbar').style.display="none";
    }

      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

    uploadCategory = () =>{
        let Ref = firebase.database().ref('categories');
        Ref.on('value', (snapshot) => {
            let categories = snapshot.val();
            let newState = [];
            for (let item in categories) {
                newState.push(
                categories[item].category);
            }
            this.setState({options:categories,
            categories:newState});
        });
    }
    getCategory = (id) =>{
        for(let item in this.state.categories){
            document.getElementById(this.state.categories[item]).classList.remove('active');
          }
        document.getElementById(id).classList.add('active');
        let category = document.getElementById(id).innerHTML;
        let filteredProducts = this.state.products.filter(e => e.category === category);
        this.setState({showingProducts:filteredProducts, category: category});
    }
    checktotal = ()=>{
        let total = 0;
        let curDate =  moment(new Date()).format('DD.MM.YYYY');
        for (let item in this.state.checks) {
            if (curDate===this.state.checks[item].date){
            total = total + this.state.checks[item].total;}
        }
        this.setState({
            dayTotal: total
         })
    }
    setDescription =()=>{
        const itemsRef = firebase.database().ref('checks');
        itemsRef.on('value', (snapshot) => {
            let checks = snapshot.val();
            let string = '';
            for (let item in checks) {
                string = string + [item] + ' : ' + parseInt(checks[item])+' , ';
            } string = string.substring(0, string.length - 2);
            this.setState({
                descriptionItems: string
            });
        });
    }
    //function for listing orders
    setChecks = () =>{
        //link to database
        const itemsRef = firebase.database().ref('orders');
        itemsRef.on('value', (snapshot) => {
            let checks = snapshot.val();
            let newState = [];
            //creating list of orders
            for (let item in checks) {
                newState.push({
                    id: checks[item].id,
                    time: checks[item].time,
                    date: checks[item].date,
                    total: checks[item].total,
                    description: checks[item].description,
                    payment: checks[item].payment
                });
            }
            //refreshing variables
            this.setState({
                checks: newState
            },()=>{
                this.checktotal();
                this.setFiltered();
            });
        });

    }
    setProducts = () =>{
        const itemsRef = firebase.database().ref('products');
        itemsRef.on('value', (snapshot) => {
            let products = snapshot.val();
            let newState = [];
            for (let item in products) {
                newState.push({
                    id: products[item].id,
                    title: products[item].title,
                    img: products[item].img,
                    price: products[item].price,
                    inCart: products[item].inCart,
                    count: products[item].count,
                    total: products[item].total,
                    store: products[item].store,
                    active: products[item].active,
                    description:products[item].description,
                    category:products[item].category
                });
            }
            this.setState({
                products: newState,
            });
            this.setCategory();
        });
    };
    getCart = () => {
        const cartRef = firebase.database().ref('cart');
        cartRef.on('value', (snapshot) => {
            let cart = snapshot.val();
            let newState = [];
            for (let item in cart) {
                newState.push({
                    id: cart[item].id,
                    title: cart[item].title,
                    img: cart[item].img,
                    price: cart[item].price,
                    inCart: cart[item].inCart,
                    count: cart[item].count,
                    total: cart[item].total,
                    store: cart[item].store,
                    active: cart[item].active,
                    description:cart[item].description,
                    category:cart[item].category
                });
            }
            this.setState(() => {
                return {
                    cart: newState
                };
            })
        });
    }
    setOrder = () => {
        const itemsRef = firebase.database().ref('ordertotal');
        itemsRef.on('value', snapshot => {
            this.setState({
                order: snapshot.val()
            });
        });
    }
    setCategoryId = () => {
        const itemsRef = firebase.database().ref('categoryId');
        itemsRef.on('value', snapshot => {
            this.setState({
                categoryId: snapshot.val()
            });
        });
    }
    setTotal = () => {
        const itemsRef = firebase.database().ref('total');
        itemsRef.on('value', snapshot => {
            this.setState({
                cartTotal: snapshot.val()
            });
        });
    }
    buy = () => {
        this.openModal();
        this.setTotal();
        const itemsRef = firebase.database().ref('ordertotal');
        let order = this.state.order + 1;
        itemsRef.set(order);
        this.setState(() => {
            return {
                order: order
            };
        })
    }
    refreshChecks = () =>{
        const Ref = firebase.database().ref('orders/');
        Ref.set(this.state.checks);
    }
    //function for confirming the order
    confirm = () => {
        //receipt modal is closed
        this.closeModal();
        //link to database
        const Ref = firebase.database().ref('products');
        const products = [...this.state.products];
        //creating object for an order
        let newState = [];
        for (let item in products) {
            newState.push({
                id: products[item].id,
                title: products[item].title,
                img: products[item].img,
                price: products[item].price,
                inCart: false,
                count: 0,
                total: 0,
                store: products[item].store,
                active: products[item].active,
                description:products[item].description,
                category:products[item].category
            });
        }
        //uploading it to database
        Ref.set(newState);
        //setting the time of the order
        let curTime = new Date().toLocaleTimeString();
        let curDate =  moment(new Date()).format('DD.MM.YYYY');
        let pay = document.getElementById('select').value;
        let newOrder = 
            {id:this.state.order,
             time: curTime,
             date: curDate,
             total: this.state.cartTotal,
             description: this.state.descriptionItems,
             payment: pay
            }
        ;

        let tempProducts = this.state.checks;
        tempProducts.push(newOrder);
        const descRef = firebase.database().ref('checks');
        descRef.remove();
        this.setState(() => {
            return {
                cart: [],
                products: newState,
                checks: tempProducts
            };
        }, () => {
            this.refreshChecks();
            this.setChecks();
            this.setProducts();
            this.addTotals();
            this.editCart();
            this.setDescription();
            this.setStartDate(new Date());
            this.setCategory()
        });
    };
    //function for setting category
    setCategory = ()=>{
        //getting variable from this.state
        let category = this.state.category;
        //checking for existing value
        if (category !== '') {
        //find products with requested category
        let filteredProducts = this.state.products.filter(e => e.category === category);
        //refreshing values
        this.setState({
            showingProducts:filteredProducts
        })} else {
            this.setState({showingProducts:this.state.products})
        }
    }
    setFiltered = () =>{
        let localDate = moment(new Date()).format('DD.MM.YYYY');
        let filteredDate = this.state.checks.filter(e => e.date === localDate.toString())
        this.setState({
            filteredDate:filteredDate
        })
    }
    closeModal = () => {
        let modalOpen = !this.state.modalOpen;
        this.setState(() => {
            return {
                modalOpen: modalOpen
            };
        })
    }
    openModal = () => {
        let modalOpen = true;
        this.setState(() => {
            return {
                modalOpen: modalOpen
            };
        })
    }
    closeModal2 = () => {
        let modalOpen2 = !this.state.modalOpen2;
        this.setState(() => {
            return {
                modalOpen2: modalOpen2
            };
        })
    }
    openModal2 = () => {
        let modalOpen2 = true;
        this.setState(() => {
            return {
                modalOpen2: modalOpen2
            };
        })
    }
    closeModal3 = () => {
        let modalOpen3 = !this.state.modalOpen3;
        this.setState(() => {
            return {
                modalOpen3: modalOpen3
            };
        })
    }
    openModal3 = () => {
        let modalOpen3 = true;
        this.setState(() => {
            return {
                modalOpen3: modalOpen3
            };
        })
    }
    closeModal4 = () => {
        let modalOpen4 = !this.state.modalOpen4;
        this.setState(() => {
            return {
                modalOpen4: modalOpen4
            };
        })
    }
    openModal4 = () => {
        let modalOpen4 = true;
        this.setState(() => {
            return {
                modalOpen4: modalOpen4
            };
        })
    }
    setCart = (product) => {
        const cartRef = firebase.database().ref('cart');
        cartRef.push(product);
    }
    editCart = () => {
        const cartRef = firebase.database().ref('cart');
        cartRef.set(this.state.cart);
    }
    refreshProducts = (products) => {
        const itemsRef = firebase.database().ref('products');
        itemsRef.set(products);
    }
    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };
    //function for adding new product to the cart
    addToCart = id => {
        //getting values
        let tempProducts = [...this.state.products];
        //new variables
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        let title = product.title;
        let count = product.count;
        //uploading database
        const descRef = firebase.database().ref('checks/'+title);
        descRef.set(count);
        let changedStore = product.store - 1;
        product.store = changedStore;
        tempProducts[index] = product;
        this.setCart(product);
        this.setState(() => {
            return {
                //refreshing variables
                products: tempProducts,
                cart: [...this.state.cart, product]
            };
        }, () => {
            this.addTotals();
            this.refreshProducts(this.state.products);
            this.setDescription();
            this.setCategory();
        });

    };
    //function for incrementing quantity of the product
    increment = (id, btnid) => {
        //getting value
        let tempProducts = [...this.state.products];
        //new variables
        const indexp = tempProducts.indexOf(this.getItem(id));
        const prod = tempProducts[indexp];
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        let title = product.title;
        let count = prod.count;
        const descRef = firebase.database().ref('checks/'+title);
        //checking if the product is in the stock
        if (product.count === (product.store + 1)) {
            document.getElementById(btnid).disabled = true;
            descRef.set(count);
        } else {
            //incrementing the quantity
            product.count = product.count + 1;
            product.total = product.count * product.price;
            let changedStore = product.store - (product.count - 1);
            prod.store = changedStore;
            prod.count = product.count;
            tempProducts[indexp] = prod;
            descRef.set(count+1);
            this.setState(() => {
                return {
                    //refreshing values
                    products: tempProducts,
                    cart: [...tempCart]
                }
            }, () => {
                this.addTotals()
                this.editCart();
                this.refreshProducts(this.state.products);
                this.setTotal();
                this.setDescription();
                this.setCategory();
            });
        }
    };
    //function for decrementing quantity of product in the cart
    decrement = (id) => {
            //getting values
            let tempProducts = [...this.state.products];
            //new variable
            const indexp = tempProducts.indexOf(this.getItem(id));
            const prod = tempProducts[indexp];
            let tempCart = [...this.state.cart];
            const selectedProduct = tempCart.find(item => item.id === id);
            const index = tempCart.indexOf(selectedProduct);
            const product = tempCart[index];
            product.count = product.count - 1;
            prod.store = prod.store + 1;
            prod.count = product.count;
            let count = product.count;
            //uploading database
            const descRef = firebase.database().ref('checks/'+product.title);
            descRef.set(count);
            tempProducts[indexp] = prod;
            //checking if the product quantity is 0 to remove it from the cart
            if (product.count === 0) {
                descRef.remove();
                this.setState(() => {
                    return {
                        //refreshing arrays
                        products: tempProducts,
                        cart: [...tempCart]
                    }
                }, () => {
                    this.refreshProducts(this.state.products);
                    this.removeItem(id);
                    this.setDescription();
                    this.setCategory();
                })
            
        }
        else {
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    products: tempProducts,
                    cart: [...tempCart]
                }
            }, () => {
                this.addTotals();
                this.editCart();
                this.refreshProducts(this.state.products);
                this.setCategory();
            });
        };


        };
    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.store = removedProduct.store + removedProduct.count;
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        tempProducts[index] = removedProduct;
        const descRef = firebase.database().ref('checks/'+removedProduct.title);
        descRef.remove();
        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            };
        }, () => {
            this.addTotals();
            this.editCart();
            this.refreshProducts(this.state.products);
            this.setCategory();
        });
    };
    clearCart = () => {
        const itemsRef = firebase.database().ref('products');
        const products = [...this.state.products];
        let newState = [];
        for (let item in products) {
            newState.push({
                id: products[item].id,
                title: products[item].title,
                img: products[item].img,
                price: products[item].price,
                inCart: false,
                count: 0,
                total: 0,
                store: (products[item].store + products[item].count),
                active: true,
                description:products[item].description,
                category:products[item].category
            });
        }
        const descRef = firebase.database().ref('checks');
        descRef.remove();
        itemsRef.set(newState);
        this.setState({
            products: newState
        });;
        this.setState(() => {
            return {
                cart: []
            };
        }, () => {
            this.setProducts();
            this.addTotals();
            this.editCart();
            this.switchActive();
            this.setDescription();
            this.setCategory();
        });
    };
    //function for adding totals of items in cart
    addTotals = () => {
       //creating total variable
        let Total = 0;
        //recursion for adding all the totals
        this.state.cart.map(item => (Total += item.total));
        //sending data to database
        const itemsRef = firebase.database().ref('total');
        itemsRef.set(Total);
        this.setState(() => {
            return {
                cartTotal: Total
            }
        })
    };
    defineProduct = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        return product;
    }
    editName = (id) => {
        const product = this.defineProduct(id);
        const input = document.createElement("input");
        const inputId = '0' + product.id;
        input.setAttribute('value', product.title);
        input.setAttribute('id', inputId);
        input.setAttribute('class', 'input white');
        const parent = document.getElementById(product.title);
        parent.appendChild(input);
        document.getElementById(product.title).style.display = 'flex';
        document.getElementById(product.id).style.display = 'none';
        this.setState(() => {
            return {
                input: [...this.state.input, input]
            }
        })
    }

    saveName = (id) => {
        const product = this.defineProduct(id);
        const inputId = '0' + product.id;
        const del = this.state.input.filter(e => e.id === inputId);
        document.getElementById(product.id).style.display = 'block';
        document.getElementById(product.title).style.display = 'none';
        del[0].remove();
        const tempInput = this.state.input.filter(e => e.id !== inputId);
        var ref = firebase.database().ref("products");
        ref.orderByChild("id").equalTo(id).on("child_added", function (snapshot) {
            const key = snapshot.key;
            let nameRef = firebase.database().ref('products/' + key + '/title');
            nameRef.set(del[0].value);
        });
        this.setState(() => {
            return {
                input: tempInput
            }
        }, () => {
            this.setProducts();
        })
    };
    editName = (id) => {
        const product = this.defineProduct(id);
        const input = document.createElement("input");
        const inputId = '0' + product.id;
        input.setAttribute('value', product.title);
        input.setAttribute('id', inputId);
        input.setAttribute('class', 'input white');
        const parent = document.getElementById(product.title);
        parent.appendChild(input);
        parent.style.display = 'flex';
        document.getElementById(product.id).style.display = 'none';
        this.setState(() => {
            return {
                input: [...this.state.input, input]
            }
        })
    };

    editDescription = (id, id1, id2) => {
        const product = this.defineProduct(id);
        const input = document.createElement("input");
        const inputId = "^^^^" + product.id;
        input.setAttribute('class', "inputd white");
        input.setAttribute('id', inputId);
        input.setAttribute('value', product.description);
        const parent = document.getElementById(id1);
        parent.appendChild(input);
        parent.style.display = 'flex';
        document.getElementById(id2).style.display = 'none';
        this.setState(() => {
            return {
                inputDescription: [...this.state.inputDescription, input]
            }
        })
    };

    saveDescription = (id, id1, id2) => {
        const product = this.defineProduct(id);
        const inputId = "^^^^" + product.id;
        const del = this.state.inputDescription.filter(e => e.id === inputId);
        document.getElementById(id2).style.display = 'block';
        document.getElementById(id1).style.display = 'none';
        del[0].remove();
        const tempInput = this.state.inputDescription.filter(e => e.id !== inputId);
        var ref = firebase.database().ref("products");
        ref.orderByChild("id").equalTo(id).on("child_added", function (snapshot) {
            const key = snapshot.key;
            let descriptionRef = firebase.database().ref('products/' + key + '/description');
            const description = del[0].value;
            descriptionRef.set(description);
        });
        this.setState(() => {
            return {
                inputDescription: tempInput
            }
        }, () => {
            this.setProducts();
        })
    };
   
    editPrice = (id, id1, id2) => {
        const product = this.defineProduct(id);
        const input = document.createElement("input");
        const inputId = "^^" + product.id;
        input.setAttribute('class', "input white");
        input.setAttribute('type', "number");
        input.setAttribute('id', inputId);
        input.setAttribute('value', product.price);
        const parent = document.getElementById(id1);
        parent.appendChild(input);
        parent.style.display = 'flex';
        document.getElementById(id2).style.display = 'none';
        this.setState(() => {
            return {
                inputPrice: [...this.state.inputPrice, input]
            }
        })
    };

    savePrice = (id, id1, id2) => {
        const product = this.defineProduct(id);
        const inputId = "^^" + product.id;
        const del = this.state.inputPrice.filter(e => e.id === inputId);
        document.getElementById(id2).style.display = 'block';
        document.getElementById(id1).style.display = 'none';
        del[0].remove();
        const tempInput = this.state.inputPrice.filter(e => e.id !== inputId);
        var ref = firebase.database().ref("products");
        ref.orderByChild("id").equalTo(id).on("child_added", function (snapshot) {
            const key = snapshot.key;
            let priceRef = firebase.database().ref('products/' + key + '/price');
            const price = parseFloat(del[0].value);
            priceRef.set(price);
        });
        this.setState(() => {
            return {
                inputPrice: tempInput
            }
        }, () => {
            this.setProducts();
        })
    };

        editQuantity = (id, id1, id2) => {
            const product = this.defineProduct(id);
            const inputId = "^^^" + product.id;
            const input = document.createElement("input");
            input.setAttribute('class', "inputq white");
            input.setAttribute('type', "number");
            input.setAttribute('id', inputId);
            input.setAttribute('value', product.store);
            const parent = document.getElementById(id1);
            parent.appendChild(input);
            parent.style.display = 'flex';
            document.getElementById(id2).style.display = 'none';
            this.setState(() => {
                return {
                    inputQuantity: [...this.state.inputQuantity, input]
                }
            })
        };

        saveQuantity = (id, id1, id2) => {
            const product = this.defineProduct(id);
            const inputId = "^^^" + product.id;
            const del = this.state.inputQuantity.filter(e => e.id === inputId);
            document.getElementById(id2).style.display = 'block';
            document.getElementById(id1).style.display = 'none';
            del[0].remove();
            const tempInput = this.state.inputQuantity.filter(e => e.id !== inputId);
            var ref = firebase.database().ref("products");
            ref.orderByChild("id").equalTo(id).on("child_added", function (snapshot) {
                const key = snapshot.key;
                let storeRef = firebase.database().ref('products/' + key + '/store');
                const quantity = parseFloat(del[0].value);
                storeRef.set(quantity);
            });
            this.setState(() => {
                return {
                    inputQuantity: tempInput
                }
            }, () => {
                this.setProducts();
                this.switchActive();
            })
        };
    //function for changing the status of the product in the stock
    statusChange = (id) => {
        //getting values
        let tempProducts = [...this.state.products];
        //new variables
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        //changing status
        product.active = !product.active;
        this.setState(() => {
            return {
                //refreshing arrays
                products: tempProducts
            };
        }, () => {
            this.refreshProducts(tempProducts);
            this.setCategory();
        })
    };

    switchActive = () => {
        var ref = firebase.database().ref("products");
        ref.orderByChild("store").equalTo(0).on("child_added", function (snapshot) {
            const key = snapshot.key;
            let storeRef = firebase.database().ref('products/' + key + '/active');
            storeRef.set(false);
        });
    }
    //function for deleting item from the stock
    deleteItem = (id) => {
        //link to database
        var ref = firebase.database().ref("products");
        //finding item by id
        ref.orderByChild("id").equalTo(id).on("child_added", function (snapshot) {
            const key = snapshot.key;
            let nameRef = firebase.database().ref('products/' + key);
            //deleting it from database
            nameRef.remove();
        });
        this.setProducts();
        this.setCategory();
    };
    checkingInputs = () => {
        let newItemName = document.getElementById('productname');
        let newItemCode = document.getElementById('productcode');
        let newItemPrice = document.getElementById('productprice');
        let newItemQuantity = document.getElementById('productquantity');
        let newItemImg = document.getElementById('productimage');
        let newItemDescription = document.getElementById('productdescription');
        let newItemCategory = document.getElementById('productcategory');
        if (newItemCode.value === '' || newItemName.value === '' || newItemPrice.value === '' || newItemQuantity.value === '' || newItemImg.value === ''|| newItemDescription.value === ''|| newItemCategory.value === '') {
            alert('Fill all the inputs');
        } else {
            this.checkingCode(newItemName, newItemCode, newItemPrice, newItemQuantity, newItemImg,newItemCategory,newItemDescription);
        }
    };
    checkingCode = (newItemName, newItemCode, newItemPrice, newItemQuantity, newItemImg,newItemCategory,newItemDescription) => {
        let product = [];
        product = this.state.products.find(item => item.id === parseFloat(newItemCode.value));
        if (product === undefined || product === null) {
            this.addProduct(newItemName, newItemCode, newItemPrice, newItemQuantity, newItemImg,newItemCategory,newItemDescription);
        } else {
            alert('Code is not unique');
            newItemCode.value = "";
        }
    };
    //function for adding new item to the stock
    addProduct = (newItemName, newItemCode, newItemPrice, newItemQuantity, newItemImg,newItemCategory,newItemDescription) => {
       //creating new item object
        const newItem = {
            id: parseFloat(newItemCode.value),
            title: newItemName.value,
            img: newItemImg.value,
            price: parseFloat(newItemPrice.value),
            description: newItemDescription.value ,
            category: newItemCategory.value,
            inCart: false,
            count: 0,
            total: 0,
            store: parseFloat(newItemQuantity.value),
            active: true
        }
        document.getElementById('productname').value = "";
        document.getElementById('productcode').value = "";
        document.getElementById('productprice').value = "";
        document.getElementById('productquantity').value = "";
        document.getElementById('productimage').value = "";
        document.getElementById('productdescription').value = "";
        //link to the database
        const itemsRef = firebase.database().ref('products');
        //uploading it to database
        itemsRef.push(newItem);
        this.setProducts();
        this.setCategory();
    }
    //function for deleting category
    deleteCategory =(id)=>{
        let deleting = id.category;
        this.setState({deleting:deleting})
    };
    //function for accepting deleting category
    acceptDeleting =()=>{
        //delete category from database
        let deleting = this.state.deleting;
        const Ref = firebase.database().ref('categories');
        Ref.orderByChild("category").equalTo(deleting).on("child_added", function (snapshot) {
            const key = snapshot.key;
            let nameRef = firebase.database().ref('categories/' + key+'/category');
            nameRef.remove();
        });
        this.setCategory();
    }
    //function for adding new category
    addCategory=()=>{
        this.setCategoryId();
        //get category from input form
        let input = document.getElementById('newCategory').value;
        const itemsRef = firebase.database().ref('categories/'+ this.state.categoryId);
        itemsRef.set({category:input});
        //upload database
        this.uploadCategory();
        const Ref = firebase.database().ref('categoryId');
        let categoryId = this.state.categoryId + 1;
        Ref.set(categoryId);
        this.setState(() => {
            return {
                categoryId: categoryId
            };
        })
    }
    setStartDate = (date) =>{
       let startDate = date;
       let localDate = moment(startDate).format('DD.MM.YYYY');
       let filteredDate = this.state.checks.filter(e => e.date === localDate.toString());
       let total=0
       for (let item in filteredDate) {
        total = total + filteredDate[item].total
    }
       this.setState(() => {
        return {
            startDate: startDate,
            filteredDate : filteredDate,
            dayTotal:total
        };
    })
    }
    render() {
        return (
            <ProductContext.Provider
             value = {
                     {
                         ...this.state,
                         addToCart: this.addToCart,
                         increment: this.increment,
                         decrement: this.decrement,
                         removeItem: this.removeItem,
                         clearCart: this.clearCart,
                         statusChange: this.statusChange,
                         deleteItem: this.deleteItem,
                         editName: this.editName,
                         saveName: this.saveName,
                         editPrice: this.editPrice,
                         savePrice: this.savePrice,
                         editQuantity: this.editQuantity,
                         saveQuantity: this.saveQuantity,
                         addTotals: this.addTotals,
                         openModal: this.openModal,
                         openModal2: this.openModal2,
                         openModal3: this.openModal3,
                         openModal4: this.openModal4,
                         buy: this.buy,
                         setOrder: this.setOrder,
                         confirm: this.confirm,
                         checkingInputs: this.checkingInputs,
                         closeModal: this.closeModal,
                         closeModal2: this.closeModal2,
                         closeModal3: this.closeModal3,
                         closeModal4: this.closeModal4,
                         setStartDate:this.setStartDate,
                         editDescription:this.editDescription,
                         saveDescription:this.saveDescription,
                         getCategory: this.getCategory,
                         deleteCategory: this.deleteCategory,
                         acceptDeleting: this.acceptDeleting,
                         addCategory: this.addCategory,
                         handleChange: this.handleChange,
                         signup:this.signup,
                         login: this.login,
                         logout: this.logout
                     }
                 } >
                 {
                     this.props.children
                 }
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer;

export {
    ProductProvider,
    ProductConsumer
};