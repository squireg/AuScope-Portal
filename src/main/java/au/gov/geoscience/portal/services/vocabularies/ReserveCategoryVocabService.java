package au.gov.geoscience.portal.services.vocabularies;

import java.util.HashMap;
import java.util.Map;

import org.apache.http.client.methods.HttpRequestBase;
import org.auscope.portal.core.server.http.HttpServiceCaller;
import org.auscope.portal.core.services.VocabularyService;
import org.auscope.portal.core.services.methodmakers.VocabularyMethodMaker;
import org.auscope.portal.core.services.methodmakers.VocabularyMethodMaker.Format;
import org.auscope.portal.core.services.methodmakers.VocabularyMethodMaker.View;
import org.auscope.portal.core.services.namespaces.VocabNamespaceContext;

import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.ResIterator;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.Statement;
import org.apache.jena.rdf.model.StmtIterator;

public class ReserveCategoryVocabService extends VocabularyService {

    public ReserveCategoryVocabService(HttpServiceCaller httpServiceCaller, VocabularyMethodMaker vocabularyMethodMaker,
            String serviceUrl) {
        super(httpServiceCaller, vocabularyMethodMaker, serviceUrl);
    }

    public Map<String, String> getAllReserveCategoryConcepts() throws Exception {
        Map<String, String> result = new HashMap<String, String>();

        Model model = ModelFactory.createDefaultModel();

        int pageNumber = 0;
        int pageSize = this.getPageSize();

        do {
            HttpRequestBase method = vocabularyMethodMaker.getAllConcepts(getServiceUrl(), Format.Rdf,
                    View.basic, pageSize, pageNumber);
            if (requestPageOfConcepts(method, model)) {
                pageNumber++;
            } else {
                break;
            }
        } while (true);

        // Iterate over all the resources with a preferred label
        Property prefLabelProperty = model.createProperty(VocabNamespaceContext.SKOS_NAMESPACE, "prefLabel");

        ResIterator iterator = model.listResourcesWithProperty(prefLabelProperty);
        while (iterator.hasNext()) {
            // Ensure we only include the preferred labels matching 'language'
            Resource res = iterator.next();
            StmtIterator prefLabelIt = res.listProperties(prefLabelProperty);
            while (prefLabelIt.hasNext()) {
                Statement prefLabelStatement = prefLabelIt.next();
                String prefLabel = prefLabelStatement.getString();

                String urn = res.getURI();
                if (urn != null) {
                    result.put(urn, prefLabel);
                }

            }
        }

        return result;
    }

    public Map<String, String> getJorcReserveCategoryConcepts() throws Exception {
        Map<String, String> result = new HashMap<String, String>();

        Model model = ModelFactory.createDefaultModel();

        int pageNumber = 0;
        int pageSize = this.getPageSize();

        do {
            HttpRequestBase method = vocabularyMethodMaker.getAllConcepts(getServiceUrl(), Format.Rdf,
                    View.description, pageSize, pageNumber);
            if (requestPageOfConcepts(method, model)) {
                pageNumber++;
            } else {
                break;
            }
        } while (true);

        // Iterate over all the resources with a preferred label
        Property prefLabelProperty = model.createProperty(VocabNamespaceContext.SKOS_NAMESPACE, "prefLabel");
        Property sourceProperty = model.createProperty(VocabNamespaceContext.DCTERMS_NAMESPACE, "source");

        ResIterator iterator = model.listResourcesWithProperty(prefLabelProperty);
        while (iterator.hasNext()) {
            // Ensure we only include the preferred labels matching 'language'
            Resource res = iterator.next();
            StmtIterator prefLabelIt = res.listProperties(prefLabelProperty);
            while (prefLabelIt.hasNext()) {
                Statement prefLabelStatement = prefLabelIt.next();
                String prefLabel = prefLabelStatement.getString();
                Statement sourceStatement = res.getProperty(sourceProperty);
                if (sourceStatement != null) {
                    String source = sourceStatement.getString();
                    if (source != null && source.contains("JORC")) {
                        String urn = res.getURI();
                        if (urn != null) {
                            result.put(urn, prefLabel);
                        }
                    }
                }

            }
        }

        return result;
    }

}
