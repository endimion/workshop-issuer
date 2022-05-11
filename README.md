# PALAEMON-EMBARKATION-REGISTRATION

---

The "PALAEMON-EMBARKATION-REGISTRATION" microservice implements necessary UIs and backend functionality to enable the completion of the passenger and crew member profiles in the PaMEAS-A system by enabling them to register their mobile devices, smart bracelets and AR goggles (only for crew).

In detail via this service passenegers and crew members authenticate using a [Verifiable Credential](https://www.w3.org/TR/vc-data-model/) (VC) called "PALAEMON-Identity-Card" issued during the pre-embarkation  [PALAEMON-REGISTRATION-SERVICE](https://github.com/uaegean-i4mLab/palaemon-registration). This endpoint is consumed using a Verification Service (implemented as a [Keycloak](https://www.keycloak.org/) Authenticator plugin) which exposes a [OIDC](https://openid.net/connect/) interface that the PALAEMON-EMBARKATION-REGISTRATION microservice connects to. Using this strategy any PALAEMON service can easily consume a "PALAEMON-Identity-Card" to authenticate the passengers and crew members.

After authentication the users can complete
their registration by linking to their profile any devices they carry with them. These devices act as the mean of identification of the users in PaMEAS-A
enabling the creation of a "Digital-Twin" (DT) for passengers and crew members. Via this DT PaMEAS-A is able to simplify, and expidiate the evacuation process in cases of emergencies by providing targeted (location and profile based) evacuation guidance messages, detect any issues/incidents that might occur to the passengers during evacuation and finally ensure that all passengers are accounted for.  


# Further Reading and Documentation

---
If you want to learn more about the "PALAEMON-EMBARKATION-REGISTRATION" microservice please read our
[PALAEMON People Management System and Storage Layer](https://docs.google.com/presentation/d/16W8H_h-qz2HTbRwcXpGJ9RnrYqZxCAZ8/edit#slide=id.g109536bd6dd_2_24). that provides an overview of this microservice as well as a demo scenario. 
To gain a better understanding of the overall functionality of PaMEAS the following presentations are
helpful:
- [PaMEAS Evacuation Messaging Policy](https://docs.google.com/presentation/d/1uxZ4Hoah89qz3MuUqt1RmGY8Dxf0upC6/edit?usp=sharing&ouid=101096721707031783382&rtpof=true&sd=true)
- [PaMEAS (and PALAEMON Pilots) ICT Integration](https://docs.google.com/presentation/d/1ni99nXpgV1XGvfo6XNaR3cbe4MRncCj3/edit?usp=sharing&ouid=101096721707031783382&rtpof=true&sd=true)
- [PaMEAS-A integration](https://docs.google.com/presentation/d/1cRt34HpJzM55kundaGE65re5CHmTzsvp/edit?usp=sharing&ouid=101096721707031783382&rtpof=true&sd=true)
- [PaMEAS-N and PaMEAS-Cell](https://docs.google.com/presentation/d/1xnB5cOLFCL9GC1_jkzBss-vrYs6-Vv5h/edit?usp=sharing&ouid=101096721707031783382&rtpof=true&sd=true)
- [PaMEAS-A Testing Scenarios](https://docs.google.com/presentation/d/178G2WV1pbgP8KswFuqrGacF0mGM67ERetdLD67w74MU/edit?usp=sharing)
- [PALAEMON People Management System and Storage Layer: Demo](https://docs.google.com/presentation/d/16W8H_h-qz2HTbRwcXpGJ9RnrYqZxCAZ8/edit?usp=sharing&ouid=101096721707031783382&rtpof=true&sd=true)

# Code

---

*Disclaimer: Although we tested the code extensively, the "PALAEMON-EMBARKATION-REGISTRATION" is a research
prototype that may contain bugs. We take no responsibility for and give no warranties in respect of using the code.*

## Layout

The "PALAEMON-EMBARKATION-REGISTRATION" microservice is implemented
via a Next.js application served over an Express server. This strategy allows us to maintain flexibility with respect to the definition of the backend endpoints that are required for the appropriate implementation of the required flows. Also, it allows for taking advantage of the advace features of Next.js such as SSR. As a result this microservice adheres to the typical Next.js structure:
- `public` contains the assets like images and css files
- `service` contains backend service functionality used for inversion control
- `page` contains  the front end routes of the system (views)
- `controlers` contains the backend server endpoints exposed by the Express server. 


# Deployment

---
The "PALAEMON-RULES-ENGINE" microservice is implemented via Spring Boot and is Dockerized in order to
facilitate its deployment. As a result this microservice can be easily deployed using:
```
docker run --name endimion13/palaemon-embarkation:0.0.1c -p  5030:5030 -d 
```
Additionally, a typical Docker-compose file for its deployment would look as follows:
```
 
version: '2'
services:
 palaemon-embarkation:
    image: endimion13/palaemon-embarkation:0.0.1c
    environment:
      NODE_ENV: "production"
      ENDPOINT: "http://dss.aegean.gr:5030"
      PORT: "5030"
      REDIS: "redis"
      EMBARKATION_BACKEND_URI: "http://dss.aegean.gr:5030/addDevice"
      ISSUER_URL: "https://dss1.aegean.gr/auth/realms/SSI"
      OIDC_REDIRECT_URI: "http://dss.aegean.gr:5030/login/callback"
      USER_INFO: "dss1.aegean.gr"
      USER_INFO_PORT: "8180"
      DB_PROXY_URL: "http://palaemon-db-proxy:8080"
      KEYCLOAK_OAUTH_TOKEN: "https://dss1.aegean.gr/auth/realms/palaemon/protocol/openid-connect/token"
      KEYCLOAK_OAUTH_CLIENT: "********"
      KEYCLOAK_OAUTH_SECRET: "*******"
    ports:
      - 5030:5030

```



