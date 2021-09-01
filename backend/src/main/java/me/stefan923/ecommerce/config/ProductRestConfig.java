package me.stefan923.ecommerce.config;

import me.stefan923.ecommerce.entity.Country;
import me.stefan923.ecommerce.entity.Product;
import me.stefan923.ecommerce.entity.ProductCategory;
import me.stefan923.ecommerce.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;
import java.util.List;

@Configuration
public class ProductRestConfig implements RepositoryRestConfigurer {

    private final EntityManager entityManager;

    @Autowired
    public ProductRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        HttpMethod[] unsupportedMethods = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };
        List<Class<?>> domainClasses = List.of(Product.class, ProductCategory.class, Country.class, State.class);
        domainClasses.forEach(tClass -> disableUnsupportedMethods(config, tClass, unsupportedMethods));

        exposeIds(config);
    }

    private <T> void disableUnsupportedMethods(RepositoryRestConfiguration config, Class<T> tClass, HttpMethod[] unsupportedMethods) {
        config.getExposureConfiguration()
                .forDomainType(tClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedMethods))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedMethods));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        config.exposeIdsFor(entityManager.getMetamodel()
                .getEntities()
                .stream()
                .map(Type::getJavaType)
                .toArray(Class[]::new));
    }

}
