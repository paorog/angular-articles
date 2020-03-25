export class User

{
    id: string
    name: string
    username: string
    email: string
    address: any
    street: string
    suite: string
    city: string
    zipcode: string
    geo: any
    lat: string
    lng: string

    constructor(user?)
    {
        {
            this.id = user.id || ""
            this.name = user.name || ""
            this.username = user.username || ""
            this.email = user.email || ""
            this.address = {
              "street": user.address.street || "",
              "suite": user.address.suite || "",
              "city": user.address.city || "",
              "zipcode": user.address.zipcode || "",
              "geo": {
                "lat": user.address.geo.lat || "",
                "lng": user.address.geo.lng || ""
              }
            }
        }
    }
}
