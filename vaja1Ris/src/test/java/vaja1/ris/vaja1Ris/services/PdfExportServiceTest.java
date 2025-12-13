package vaja1.ris.vaja1Ris.services;

import org.junit.jupiter.api.Test;
import vaja1.ris.vaja1Ris.dao.RecipesDao;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class PdfExportServiceTest {

    @Test
    void generatePdf_emptyRecipeList_handlesGracefully() {
        RecipesDao recipesDao = mock(RecipesDao.class);
        PdfExportService service = new PdfExportService(recipesDao);

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> service.generatePdf(Collections.emptyList())
        );

        assertEquals("Cannot generate PDF from empty recipe list", ex.getMessage());
    }
}
